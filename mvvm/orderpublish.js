class Orderpublish{
    constructor(){
        this.storeArr=[]
    }
    order(watch){
        this.storeArr.push(watch);
    }
    publish(){
        console.log("this.storeArr222",this.storeArr)
        if(this.storeArr.length==0) return false;
        this.storeArr.forEach(function(item){
            item.update()
        })
    }
}