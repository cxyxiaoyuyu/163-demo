{
    let view = {
        el: '.songList-container',
        template: `
            <ul class="songList">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
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
