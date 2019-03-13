{
    let view = {
        el: '.container > main',
        template: `
         <form class="form">
                <h1>新建歌曲</h1>
                <div class="row">
                    <span>歌名</span>
                    <input type="text" value="__name__">
                </div>
                <div class="row">
                    <span>歌手</span>
                    <input type="text" value="__singer__">
                </div>
                <div class="row">
                    <span>链接</span>
                    <input type="text" value="__url__">
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
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render()
            this.bindEvents()
        },
        bindEvents(){
            eventHub.on('upload',(data)=>{
                console.log('song form get data')
                this.view.render(data)
            })
        }
    }
    controller.init(view,model)
}
