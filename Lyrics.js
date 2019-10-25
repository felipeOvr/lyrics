class Lyric
{
    constructor ()
    {
        this._api = 'https://api.lyrics.ovh/v1/' // artistName/songName params to completed request

        this._buttonSubmitEl = document.querySelector ('button[type=submit]')

        this.start()
    }

    start ()
    {
        this._buttonSubmitEl.addEventListener ('click', event => this.request(event))
    }

    search (rest)
    {
        return fetch (this._api + rest)
    }

    async request (event)
    {
        event.preventDefault()

        this._buttonSubmitEl.innerHTML = `<div class="spinner-grow m-0 text-light"> <span class="sr-only m-0">Loading...</span> </div>`

        try
        {
            const responseRequest = await this.search (this.artist + '/' + this.song)

            const lyricObject = await responseRequest.json ()

            if (lyricObject.lyrics)
            {
                this.lyricDiv.innerHTML = lyricObject.lyrics
            }
            else
            {
                this.lyricDiv.innerHTML = 'Nenhum resultado para essa pesquisa :('
            }

        }
        catch (error)
        {
            this.lyricDiv.innerHTML = 'Ooops ! <br/><br/> ' + error
        }

        finally
        {
            this._buttonSubmitEl.innerHTML = `search`
        }
    }

    get artist ()
    {
        return document.querySelector ('.artist-name').value
    }

    get song ()
    {
        return document.querySelector ('.song-name').value
    }

    get lyricDiv ()
    {
        return document.querySelector ('.lyric')
    }
}