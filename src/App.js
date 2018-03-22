import React, { Component } from 'react';

class App extends Component {

  state = {

    inputValue: '',

    outputValue: '',

  }

  template = '<div class="jwp"><div id="00000000"><script src="//content.jwplatform.com/libraries/[VIDEPLAYERID].js"></script><script type="text/javascript"> var vid = jwplayer("00000000"); vid.setup({ file: "//content.jwplatform.com/videos/[VIDEOID].mp4", image: "//content.jwplatform.com/thumbs/[VIDEOID].jpg", advertising: { client: "vast", tag: "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/22633255/IA_Video&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url= __referrer__&description_url=__page-url__&correlator=__random-number__" } }); </script></div></div>'

  render() {
    console.log(this.state.outputValue);
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
              readOnly
              name="Text1"
              rows="15"
              placeholder={this.template}
              value={this.state.outputValue}
              style={{margin: '1rem 0', padding: '1.5rem', width: '100%', fontSize: '1vw'}}
            />
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
      const x = this.template.replace(/00000000/g, uid).replace(/\[VIDEPLAYERID\]/g, videoPlayerId).replace(/\[VIDEOID\]/g, videoId)
      console.log(x)
      return this.template.replace(/00000000/g, uid).replace(/\[VIDEPLAYERID\]/g, videoPlayerId).replace(/\[VIDEOID\]/g, videoId)
    }

    if (!regexParsedInput || !videoPlayerId || !videoId) return this.setState({inputValue: event.target.value, outputValue: ''})

    this.setState({
      inputValue: event.target.value,
      outputValue: plugValues(event.target.value, videoPlayerId, videoId)
    })

    // event.target.value
    /*
    ? does it follow the proper format, e.g. <script src="https://content.jwplatform.com/players/anIzh238-O5vsTKpz.js"></script>

    get regex.replace the fields

    */
    console.log(event.target.value)
  }
}

export default App;
