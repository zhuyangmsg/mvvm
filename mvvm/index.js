class MVVM{
    constructor(vm){
        this.$el = vm.el.nodeType==1?vm.el:document.getElementById(vm.el);
        this.$data = vm.data;
        if(this.$el){
            new Observe(this.$data)
            this.complie()
        }
    }
    complie(){
        //所有的操作dom都在内存里
        var fragment = document.createDocumentFragment();
        var first;
        while(first=this.$el.firstChild){
            fragment.appendChild(first)
        }
        //操作dom
        this.renderDom(fragment)
        //全部操作dom完成，一次性渲染出来
        this.$el.appendChild(fragment)
    }
    renderDom(fragment){
        var _that = this;
        Array.from(fragment.childNodes).forEach(function(item){
            //是否为元素节点
            if(item.nodeType==1){
                _that.elementDom(item);
                if(item.childNodes.length>0) _that.renderDom(item);
            }else{
                _that.textDom(item)
            }
        })
    }
    elementDom(item){
        var _that = this;
        Array.from(item.attributes).forEach(function(subItem){
            if(subItem.name.includes("v-")){
                _that.eleRender(subItem.value,item);
            }
        })
    }
    textDom(item){
        var reg = /\{\{([^}]+)\}\}/;
        var _that = this;
        item.textContent.replace(reg,function(){
            new Watch(_that,arguments[1],function(newValue){
                item.textContent = newValue;
            })
            item.textContent=_that.transformValue(arguments[1]);
        });
    }
    eleRender(explor,dom){
        var value = this.transformValue(explor);
        var _that = this;
        console.log("dom.nodeValue",dom.nodeValue)
        dom.addEventListener("input",function(ev){
            var newValue = ev.target.value;
            var splitArr = explor.split(".");
            var splitValue = splitArr.reduce(function(prev,next,idx){
                console.log(idx);
                console.log(splitArr.length-1)
                if(idx==splitArr.length-1){
                    return prev[next]=newValue
                }
                return prev[next];
            },_that.$data);
        })
        new Watch(this,explor,function(newValue){
            dom.value = newValue;
        })
        dom.value = value;
    }
    transformValue(explor){
        var splitArr = explor.split(".");
        var splitValue = splitArr.reduce(function(prev,next){
            return prev[next];
        },this.$data);
        return splitValue;
    }
}