{
    let view = {
        el: '.songList-container',
        template: `
            <ul class="songList">
            </ul>
        `,
        init(){
            this.$el = $(this.el)
        },
        render(data){
            this.$el.html(this.template)
            let {songs} = data
            this.$el.find('ul').empty()
            songs.map((song)=>{
                this.$el.find('ul').append(`<li>${song.name}</li>`)
            })

        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return {id:song.id,...song.attributes}
                })
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.init()
            this.view.render(this.model.data)
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
            window.eventHub.on('upload',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('create',(newSong)=>{
                console.log(newSong)
                this.model.data.songs.push(newSong)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}
