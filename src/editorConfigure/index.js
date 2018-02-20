let options = {
  name: 'vue-html5-editor',
  language: 'zh-cn',
  showModuleName: true,
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    font: 'fa fa-font',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'fa fa-file-image-o',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    'full-screen': 'fa fa-arrows-alt',
    info: 'fa fa-info'
  },
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen'
  ],
  image: {
    sizeLimit: 512 * 1024,
    compress: {
      width: 500,
      quality: 80
    },
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    uploadHandler (responseText) {
      var json = JSON.parse(responseText)
      if (!json.ok) {
        alert(json.msg)
      } else {
        console.log(json.data)
        return json.data
      }
    }
  }
}
export default options
