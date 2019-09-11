const core = require('@actions/core');
const axios = require('axios');

async function run () {
  try {
    const url = core.getInput('url');
    const type = core.getInput('type');
    const content = core.getInput('content');
    const at = core.getInput('at');

    let payload = {
      msgtype: 'text',
      text: {
        content: content
      },
      at: {}
    };
    if (type === 'markdown') {
      payload = {
        msgtype: 'markdown',
        markdown: {
          title: content.substr(0, 10),
          text: content
        },

        at: {}
      };
    }

    if (at !== '') {
      if (at.toLowerCase() === 'all') {
        payload.at.isAtAll = true;
      }else{
        payload.at.atMobiles = at.split(",");
      }
    }

    if (type === "custom"){
      payload = JSON.parse(content)
    }

    const ret = await axios.post(url, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('response:', ret.data);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();