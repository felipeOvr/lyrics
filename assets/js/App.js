export default class App
{
    constructor ()
    {
        this._band = ''
        this._song = ''
        this._api = 'https://api.lyrics.ovh/v1' // /artist/song
    }

    startApp()
    {
        document
        .querySelector('#search-button')
        .addEventListener('click', () => {
            this.resetLyric()

            this.popup('Banda / Artista', 'Seguinte')
            .then(
                band => {
                    this._band = band
        
                    this.popup('Som', 'Pronto')
                    .then(
                        song => {
                            this._song = song
                            this.search()
                        }
                    )
                }
            )
        })
    }

    popup(title, text)
    {
        return swal(title, {
            content: 'input',
            button: { text }
        })
    }

    async search()
    {
        let req = await fetch(`${this._api}/${this._band}/${this._song}`)

        if (req.status !== 404) {
            let response = await req.json()

            document
            .querySelector('#letter-container p')
            .textContent = response.lyrics

            return
        }

        swal("Não conseguimos achar nada 🙁")
    }

    resetLyric()
    {
        document
        .querySelector('#letter-container p')
        .textContent = 'Busque por uma música'
    }
}


