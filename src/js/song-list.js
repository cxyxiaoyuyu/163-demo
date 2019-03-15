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
                this.$el.find('ul').append(`<li data-id="${song.id}">${song.name}</li>`)
            })

        },
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        },
        activeItem(li){
            console.log(li)
            $(li).addClass('active').siblings().removeClass('active')
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
            this.getAllSongs()
            this.bindEventHub()
            this.bindEvents()
        },
        getAllSongs(){
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            this.view.$el.on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId = e.currentTarget.getAttribute('data-id')
                console.log(songId)
                window.eventHub.emit('select',{id:songId})
            })

        },
        bindEventHub(){
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
