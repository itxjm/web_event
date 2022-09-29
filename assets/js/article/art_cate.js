$(function () {
  let layer = layui.layer
  initArtCateList()
  // 获取文章分类列表
  function initArtCateList() {
    // const id = $('#form-add [name=id]').val()
    // const cate_name = $('#form-add [name=cate_name]').val()
    // const cate_alias = $('#form-add [name=cate_alias]').val()
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      contentType: 'application/json',
      
      // data: JSON.stringify({
      //   id,
      //   cate_name,
      //   cate_alias
      // }),
      
      success: function (res) {
        // if(res.code !== 0) return layer.msg(res.message)
        console.log(res.data)
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  // 通过代理的形式  为form-add表单绑定submit事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    console.log('ok')
    const cate_name = $('#form-add [name=cate_name]').val()
    const cate_alias = $('#form-add [name=cate_alias]').val()
    // const id = $('#form-add [name=id]').val()
    $.ajax({
      method: 'POST',
      url: '/my/cate/add',
      // ContentType: 'Content-Type': 'application',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      contentType: 'application/json',
      // data: $(this).serialize(),
      data: JSON.stringify({
        cate_name,
        cate_alias
      }),
      success: function (res) {
        if (res.code !== 0) return layer.msg('新增分类失败！')
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引 关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  // 通过代理的形式  为btn-edit按钮绑定点击事件
  let indexEdit = null
  $('tbody').on('click','#btn-edit',function(){
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })
  })
})