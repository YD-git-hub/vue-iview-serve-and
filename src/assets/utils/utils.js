import {Message} from 'view-design';
export default {
  /**
   * 图片限制2M
   * @param file
   * @returns {boolean}
   * @constructor
   */
  Imglimit(file) {
    if (file.size < 1024 * 2 * 1024) {
      return true;
    } else {
      Message['warning']({
        content: '文件  ' + file.name + ' 体积过大, 最大不能超过2M.',
        duration: 5,
      });
      return false;
    }
  },

  /**
   * 视频限制30M，30s
   * @param file
   * @returns {boolean}
   */
  videoSize(file) {
    // let url = URL.createObjectURL(file);
    // let audioElement = new Audio(url);
    // audioElement.addEventListener("loadedmetadata", function () {
    //   let duration = audioElement.duration; //时长为秒，小数，182.36
    //   // 视频小于30s
    //   if (duration > 30) {
    //     Message['warning']({
    //       content: '视频  ' + file.name + ' 时间过长, 最大不能超过30秒.',
    //     });
    //     return false;
    //   }else {
    //     // 视频大小
    //     if (file.size < 1024 * 30 * 1024) {
    //       return true;
    //     } else {
    //       Message['warning']({
    //         content: '文件  ' + file.name + ' 体积过大, 最大不能超过30M.',
    //         duration: 5,
    //       });
    //       return false;
    //     }
    //   }
    // });
    // 视频大小
    if (file.size < 1024 * 30 * 1024) {
      return true;
    } else {
      Message['warning']({
        content: '文件  ' + file.name + ' 体积过大, 最大不能超过30M.',
        duration: 5,
      });
      return false;
    }
  },

  /**
   * 检索数据是否填写
   * @param data 数据{}
   * @param arr 检索对象[]
   * @returns {boolean}
   */
  objCheck(data, arr) {
    for (const key in data) {
      if (data[key] === '') {
        for (const item of arr) {
          if (key === item.title) {
            Message['warning']({
              content: item.tip + '数据不能为空',
              duration: 5,
            });
            return false;
          }
        }
        return true;
      }
    }
  },

  copy(text) {
    let input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    Message['success']({
      content: '复制成功',
      duration: 5,
    });
  }, // 复制方法
  download(code_img){
    location.href=imgpath+'/home/wx/downfile?filename='+imgpath + code_img
  }

};

