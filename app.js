const form = document.getElementById('generate-form')
const qrcode = document.getElementById('qrcode')

onGenerateSubmit = e => {
  e.preventDefault()
  clearQR()
  document.getElementById('success').classList.add('hidden')
  const url = document.getElementById('url').value
  const size = document.getElementById('size').value
  if (url === '') {
    alert('Please enter a URL')
  } else {
    showSpinner()
    setTimeout(() => {
      hideSpinner()
      document.getElementById('success').classList.remove('hidden')
      generateQRCode(url, size)
      setTimeout(() => {
        const saveUrl = qrcode.querySelector('img').src
        createSaveButton(saveUrl)
        document.getElementById('save-link').scrollIntoView()
      }, 50)
    }, 2000)
  }
}
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size
  })
}
const showSpinner = () => {
  document.getElementById('spinner').classList.remove('hidden')
  //document.getElementById('spinner').style.display = 'block'
}
const hideSpinner = () => {
  document.getElementById('spinner').classList.add('hidden')
  //document.getElementById('spinner').style.display = 'block'
}
const clearQR = () => {
  qrcode.innerHTML = ''
  const saveLink = document.getElementById('save-link')
  if (saveLink) {
    saveLink.remove()
  }
}
const createSaveButton = downloadUrl => {
  const link = document.createElement('a')
  link.id = 'save-link'
  link.classList =
    'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
  link.href = downloadUrl
  link.download = 'qrcode'
  link.innerText = 'Save Image'
  document.getElementById('generated-qr').appendChild(link)
}
hideSpinner()

form.addEventListener('submit', onGenerateSubmit)
