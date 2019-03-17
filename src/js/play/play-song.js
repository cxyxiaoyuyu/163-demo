{
    let view = {
        el: '#app',
        init(){
            this.$el = $(this.el)
        },
        template: `

        `,
        render(data){
            console.log(data)
            this.$el.find('audio').attr('src',data.url)
            this.$el.find('.songImg').attr('src',data.img)
            this.$el.find('.cover').css('background-image',`url('${data.img}')`)
        },
        play(){
            console.log(this.$el.find('audio'))
            this.$el.find('audio')[0].play()
        },
        pause(){
            this.$el.find('audio')[0].pause()
        },
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
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('click','.disc-container',(ev)=>{
                console.log('1111')
                if($(ev.currentTarget).hasClass('playing')){
                    this.view.$el.find('#play').removeClass('hide')
                    this.view.pause()
                }else{
                    this.view.$el.find('#play').addClass('hide')
                    this.view.play()
                }
                $(ev.currentTarget).toggleClass('playing')
            })
        },
        getSongId(){
            let search = window.location.search.substring(1)
            let query = search.split('&').filter(v=>v)
            let id = query[0].split('=')[1]
            console.log(id)
            this.model.get(id).then(()=>{
                console.log(this.model.data)
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}

