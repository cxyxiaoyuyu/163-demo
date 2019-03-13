{
    let view = {
        el: '.container > main',
        init(){
            this.$el = $(this.el)
        },
        template: `
         <form class="form">
                <h1>新建歌曲</h1>
                <div class="row">
                    <span>歌名</span>
                    <input type="text" value="__name__" name="name">
                </div>
                <div class="row">
                    <span>歌手</span>
                    <input type="text" value="__singer__" name="singer">
                </div>
                <div class="row">
                    <span>链接</span>
                    <input type="text" value="__url__" name="url">
                </div>
                <div class="row submit">
                    <button>submit</button>
                </div>
            </form>
        `,
        render(data={}){
            console.log(data)
            let placeholder = ['name','url','singer']
            let html = this.template
            placeholder.map((string)=>{
                html = html.replace(`__${string}__`,data[string] || '')
            })
            $(this.el).html(html)
        }
    }
    let model = {
        data: {name:'',singer:'',url:'',id:''},
        create(obj){
            var song = AV.Object.extend('song');
            var song = new song();
            song.set('name', obj.name);
            song.set('singer', obj.singer);
            song.set('url', obj.url);
            return song.save().then((newSong)=>{
                console.log(newSong)
                let {id,attributes} = newSong
                Object.assign(this.data,{id,name:attributes.name,singer:attributes.singer,url:attributes.url})
                console.log(this.data)
            }, function (error) {
                // 异常处理
                console.error('Failed to create new object, with error message: ' + error.message);
            });
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.view.render()
            eventHub.on('upload',(data)=>{
                console.log('song form get data')
                this.view.render(data)
            })
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('submit','.form',(e)=>{
                e.preventDefault()
                let needs = ['name','singer','url']
                let obj = {}
                needs.map((string)=>{
                    obj[string] = this.view.$el.find(`[name=${string}]`).val()
                })
                this.model.create(obj).then(()=>{
                    console.log(this.model.data)
                })
            })
        }
    }
    controller.init(view,model)
}
