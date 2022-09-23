// 注意 每次调用$.get()或$.post()或$.ajax()时  会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
// console.log(options.url)
// 在发起真正的Ajax请求之前 统一拼接请求的 根路径
options.url = 'http://www.liulongbin.top:3007' + options.url
console.log(options.url)
})