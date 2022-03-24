export function convertBase64UrlToFormData (data) {
  var base64String = data;

  //这里对base64串进行操作，去掉url头，并转换为byte
  var bytes = window.atob(base64String.split(',')[1]);

  //处理异常，将ASCII码小于0的转换为大于0，这里有两种写法
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的？注：①
  }
  //Blob对象
  var blob = new Blob([ab], { type: 'image/jpeg' }); //type为图片的格式

  // //FormData对象
  // var formData = new FormData();
  // //TDOD Ajax或者其他方式上传FormData对象

  // //FormData对象接受三个参数，第三个参数为文件名，通常我们只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
  // formData.append('file', blob, Date.now() + '.jpg');

  return blob;
}