{
    let view = {
        el: '.newSong',
        template: `
            <span>新建歌曲</span>
        `,
        render(){
            $(this.el).html(this.template)
        },
        active(){
            $(this).addClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render()
            eventHub.on('upload',(data)=>{
                console.log('new_song get data')
                this.view.active()
            })
        },

    }
    controller.init(view,model)
}
