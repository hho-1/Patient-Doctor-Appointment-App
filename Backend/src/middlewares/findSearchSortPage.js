"use strict"


// app.use(findSearchSortPage):

module.exports = (req, res, next) => {  
// Searching & Sorting & Pagination:  

    // SEARCHING: URL?search[key1]=value1&search[key2]=value2
    let search = req.query?.search || {}
    for (let key in search) {
        // Check if the value is an object with $regex property
        if (typeof search[key] === 'object' && '$regex' in search[key]) {
          search[key] = search[key]; // Leave it as is
        } else {
          // Convert the value to a regex object
          search[key] = { $regex: search[key], $options: 'i' };
        }
      }

      console.log("Search  middleware kullanildi")

    /* Alternative Searching: *
    let where = [];
    for (let key in search) where.push(`this.${key}.toString().includes('${search[key]}')`)
    search = where.length ? { $where: where.join(' && ') } : {}
    /* Alternative Searching: */

    // Cancelled -> SORTING: URL?sort[key1]=1&sort[key2]=-1 (1:ASC, -1:DESC)
    // mongoose=^8.0 -> SORTING: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
    const sort = req.query?.sort || {}

    // PAGINATION: URL?page=1&limit=10
    // LIMIT:
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 12)
    // PAGE:
    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1
    // SKIP:
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    // Run SearchingSortingPagination engine for Model:
    res.getModelList = async function (Model, filters = {}, populate = null) {

        const filtersAndSearch = { ...filters, ...search  }

        // return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
        // FOR REACT PROJECT:
        return await Model.find(filtersAndSearch).populate(populate)
    }

    // Details:
    res.getModelListDetails = async function (Model, filters = {}) {

        const filtersAndSearch = { ...filters, ...search }

        //const dataCount = await Model.count(filtersAndSearch)

        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                //total: Math.ceil(dataCount / limit)
            },
            //totalRecords: dataCount,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}