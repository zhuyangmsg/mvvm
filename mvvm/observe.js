class Observe{
    dep = new Orderpublish();
    constructor(data){
        this.observe(data)
    }
    observe(data){
        if(!data || typeof(data)!='object'){
            return false;
        }
        for(var i in data){
            this.interData(data,data[i],i);
        }
    }
    interData(data,value,key){
        var _that = this;
        this.observe(value);
        Object.defineProperty(data,key,{
            configurable:true,
            enumerable:true,
            get(){
                if(Orderpublish.target){
                    _that.dep.order(Orderpublish.target)
                }
                return value
            },
            set(newValue){
                value=newValue;
                _that.dep.publish();
                
            }
        })
    }
}