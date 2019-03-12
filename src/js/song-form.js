{
    let view = {
        el: '.container > main',
        template: `
         <form class="form">
                <h1>新建歌曲</h1>
                <div class="row">
                    <span>歌名</span>
                    <input type="text">
                </div>
                <div class="row">
                    <span>歌手</span>
                    <input type="text">
                </div>
                <div class="row">
                    <span>歌名</span>
                    <input type="text">
                </div>
                <div class="row submit">
                    <button>submit</button>
                </div>
            </form>
        `,
        render(){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render()
        }
    }
    controller.init(view,model)
}
