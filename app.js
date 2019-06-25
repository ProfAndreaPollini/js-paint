const AppStates = Object.freeze({
    START_APP: Symbol("start_app")
})

class App {



    constructor() {
        console.log("Creating app...")
        this.tools = []
        this.selected_tool = undefined

        this.state = AppStates.START_APP
    }
}