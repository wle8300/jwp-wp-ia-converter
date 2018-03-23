import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class App extends Component {

  state = {

    inputValue: '',

    isInputValid: false,

    outputValue: '',

    wasEmbedCodeCopied: false,

  }

  template = '<!-- ▽ JWP EMBED ▽ -->\n<div class="jwp"><div id="00000000"><script src="//content.jwplatform.com/libraries/[VIDEPLAYERID].js"></script><script type="text/javascript"> var vid = jwplayer("00000000"); vid.setup({ file: "//content.jwplatform.com/videos/[VIDEOID].mp4", image: "//content.jwplatform.com/thumbs/[VIDEOID].jpg", advertising: { client: "vast", tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/22633255/IA_Video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url= __referrer__&description_url=__page-url__&correlator=__random-number__" } }); </script></div></div>\n<!-- △ JWP EMBED △ -->\n\n\n'

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        fontFamily: '"helvetica", sans-serif',
        backgroundColor: '#f5f5f5',
      }}>

        <div style={{width: '50%'}}>
          <h2 style={{fontSize: '2vw', fontWeight: 'bold'}}>Convert JWP embed code to<br/>compatible Wordpress+InstantArticles embeds</h2>
          <div>
            <input
              style={{margin: '1rem 0', padding: '1.5rem', width: '100%',fontSize: '1vw'}}
              type="text"
              placeholder="<script src=&quot;https://content.jwplatform.com/players/anIzh238-O5vsTKpz.js&quot;></script>"
              onChange={this.handleInput}
              value={this.state.inputValue}
            />
          </div>
          <div>
            <textarea
              name="Text1"
              rows="15"
              placeholder={this.template}
              value={this.state.outputValue}
              style={{margin: '1rem 0', padding: '1.5rem', width: '100%', fontSize: '1vw'}}
            />
          </div>
          <div style={{display: this.state.isInputValid ? 'block' : 'none'}}>
            <CopyToClipboard text={this.state.outputValue} onCopy={this.handleCopy}>
              <button style={{padding: '1rem', width: '100%', backgroundColor: this.state.wasEmbedCodeCopied ? 'rgb(64, 172, 49)' : 'inherit'}}>
                {this.state.wasEmbedCodeCopied ? <span style={{fontWeight: 'bold', color: '#f0f0f0'}}>COPIED!</span> : 'COPY EMBED CODE'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }

  handleInput = (event) => {

    const regexParsedInput = /<script\ssrc=".*?players\/(.*?)-(.+?).js"><\/script>/g.exec(event.target.value)
    const videoPlayerId = regexParsedInput && regexParsedInput[2]
    const videoId = regexParsedInput && regexParsedInput[1]
    const plugValues = (scriptSnippet, videoPlayerId, videoId) => {

      const uid = `jwp-${Date.now()}`

      return this.template.replace(/00000000/g, uid).replace(/\[VIDEPLAYERID\]/g, videoPlayerId).replace(/\[VIDEOID\]/g, videoId)
    }

    if (!regexParsedInput || !videoPlayerId || !videoId) return this.setState({isInputValid: false, inputValue: event.target.value, outputValue: ''})

    this.setState({
      isInputValid: true,
      inputValue: event.target.value,
      outputValue: plugValues(event.target.value, videoPlayerId, videoId)
    })
  }

  handleCopy = () => {

    this.setState({wasEmbedCodeCopied: true}, () => {
      setTimeout(() => {
        this.setState({wasEmbedCodeCopied: false})
      }, 2000)
    })
  }
}

export default App;
