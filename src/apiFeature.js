export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery
        this.searchQuery = searchQuery


    }
    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1 // if false then go to page 1

        if (this.searchQuery.page < 1) pageNumber = 1
        let limit = 2
        let skip = (parseInt(pageNumber - 1)) * limit
        this.pageNumber = pageNumber
        this.mongooseQuery.skip(skip).limit(limit)

        return this
    }

    filter() {




        let filterObj = structuredClone(this.searchQuery) // deep copy
        filterObj = JSON.stringify(filterObj) // convert it to string
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/, (value) => {

            return "$" + value

        })
        filterObj = JSON.parse(filterObj) // convert it to object again
        let excluded = ['page', 'sort', 'search', 'fields']
        excluded.forEach(value => {
            return delete filterObj[value]
        });
        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)


        }

        return this

    }

    fields() {
        if (this.searchQuery.fields) {
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)


        }
        return this
    }
    search() {
        if (this.searchQuery.search) {

            this.mongooseQuery.find({

                $or: [

                    { title: { $regex: this.searchQuery.search, $options: 'i' } },
                    { description: { $regex: this.searchQuery.search, $options: 'i' } }



                ]


            })


        }

        return this
    }
}