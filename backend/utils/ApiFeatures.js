class ApiFeatures {
    constructor(query, queryStr)
    {
        this.query = query; 
        this.queryStr = queryStr; 
    }


    search()
    {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword, 
                $options: "i"
            }
        }:{}

          console.log(keyword); 
          this.query = this.query.find({...keyword}); 
          return this ; 
    }
    filter()
    {
     
        const queryCopy =  { ...this.queryStr}; 
        // console.log(queryCopy); 
        const removeFields = ['keyword', 'limit', 'page']; 

        removeFields.forEach(el => delete removeFields[el]); 
        // console.log(queryCopy); 

        let queryStr = JSON.stringify(queryCopy); 

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); 
        // console.log(queryCopy); 
        this.query = this.query.find(JSON.parse(queryStr)); 
        return this ; 
    }
    pagination(NbrProduitParPage)
    {
        const currentPage = Number(this.queryStr.page || 1) ; 
        const skip = NbrProduitParPage * ( currentPage - 1); 
        this.query = this.query.limit(NbrProduitParPage).skip(skip);  
        return this ; 
    }
}


module.exports = ApiFeatures ; 