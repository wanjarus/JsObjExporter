var Blob = require('blob')

export default {
  export: (params) => {
    exportObject2CSV(params.headers, params.exportable, params.fileName)
  }
}

/**
 * Function to export the object as csv.
 * @param  {array} headers the columns of the csv file.
 * @param  {object} exportable the records of csv file.
 * @param  {string} fileName the title of the file which needs to be exported.
 */
function exportObject2CSV (headers, exportable, fileName) {
  if (headers) {
    exportable.unshift(headers)
  }

  // Convert Object to JSON
  let jsonObject = JSON.stringify(exportable)
  let csv = convert2csv(jsonObject)
  let exportFileName = fileName + '.csv'
  let blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  })
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportFileName)
  } else {
    let link = document.createElement('a')
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', exportFileName)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

/**
 * Function to create an object of arrays to csv.
 * @param  {object} objArray the json data which needs to be converted to an array.
 */
function convert2csv (objArray) {
  let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
  let str = ''
  for (var i = 0; i < array.length; i++) {
    var line = ''
    for (var index in array[i]) {
      if (line !== '') line += ','
      line += array[i][index]
    }
    str += line + '\r\n'
  }
  return str
}
