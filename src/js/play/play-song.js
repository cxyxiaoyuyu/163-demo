{
    let view = {
        el: '#app',
        init(){
            this.$el = $(this.el)
        },
        template: `
            <audio autoplay controls src="__url__"></audio>
        `,
        render(url){
            this.$el.html(this.template.replace('__url__',url))
        }
    }
    let model = {
        data: {id:'',url:'',name:'',singer:''},
        get(id){
            let query = new AV.Query('song');
            return query.get(id).then((song)=>{
                this.data = {id,...song.attributes}
            })
        }
    }

    let controller = {
        init(view,model){
            this.view = view
            this.view.init()
            this.model = model
            this.getSongId()
        },
        getSongId(){
            let search = window.location.search.substring(1)
            let query = search.split('&').filter(v=>v)
            let id = query[0].split('=')[1]
            console.log(id)
            this.model.get(id).then(()=>{
                console.log(this.model.data)
                this.view.render(this.model.data.url)
            })
        }
    }
    controller.init(view,model)
}

