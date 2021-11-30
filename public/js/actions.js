//открыть редактор
$('#editor,#write-post').click((e) => {
  e.preventDefault();
  const token = localStorage.getItem('access_blog_token');
  $.ajax({
    url: '/editor',
    type: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
    success: function (data, request, response) {
      const html = response.responseText;
      const content = document.createElement('html');
      content.innerHTML = html;
      $('html').replaceWith(content);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
//открыть редактирование поста
$('#_edit_button').click((e) => {
  e.preventDefault();
  const token = localStorage.getItem('access_blog_token');
  $.ajax({
    url: '/editor',
    type: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
    success: function (data, request, response) {
      $('.ql-editor h1').remove();
      const postId = $('article#_tl_editor').data('id');
      const postTitle = $('title').text();
      const postContent = $('#_tl_editor').html();

      const responseText = response.responseText;
      const html = document.createElement('html');
      html.innerHTML = responseText;
      $('html').replaceWith(html);
      $('.ql-editor').replaceWith(postContent);
      $('.ql-editor').attr('contenteditable', true);
      $('h1#title').text(postTitle);
      $('article').attr('data-id', postId);
      $('button#_publish_button').attr('id', 'update');
    },
    error: function (error) {
      console.log(error);
    },
  });
});
// отправить пост
$('#_publish_button').click((e) => {
  e.preventDefault();
  const token = localStorage.getItem('access_blog_token');
  const data = {
    title: $('h1#title').text(),
    content: $('.ql-editor').html(),
    userId: localStorage.getItem('userId'),
    blogId: localStorage.getItem('blogId'),
  };

  //обновить пост
  if (e.target.id === 'update') {
    console.log('update post');
    const id = $('article#_tl_editor').data('id');
    $.ajax({
      url: `${id}/update`,
      type: 'PATCH',
      cache: false,
      data: data,
      headers: {
        authorization: `Bearer ${token}`,
      },
      success: function () {
        alert('Пост обновлён!');
        $('h1#title').html('');
        $('.ql-editor').html('');
      },
      error: function (jqXHR, textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err);
      },
    });
  }

  // создать пост
  if (e.target.id === '_publish_button') {
    $.ajax({
      url: '/posts',
      type: 'POST',
      cache: false,
      data: data,
      headers: {
        authorization: `Bearer ${token}`,
      },
      success: function () {
        alert('Отправлено на модерацию!');
        $('h1#title').html('');
        $('.ql-editor').html('');
      },
      error: function (jqXHR, textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err);
      },
    });
  }
});
//выход из блога
$('a#exit').click((e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.replace('/');
});

//обновить профиль
$('#updateProfile button').click((e) => {
  e.preventDefault();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('access_blog_token');
  history.pushState(null, null, `/users/${userId}`);
  const data = {
    name: $('input#username').val(),
    email: $('input#eMail').val(),
  };

  $.ajax({
    url: `${userId}/update`,
    type: 'PATCH',
    cache: false,
    data: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
    success: function () {
      document.location.assign(`/profile/${userId}`);
    },
    error: function (jqXHR, textStatus, err) {
      alert('text status ' + textStatus + ', err ' + err);
      document.location.assign(`/profile/${userId}`);
    },
  });
});

//обновить блог
$('#updateBlog button').click((e) => {
  e.preventDefault();
  const userId = localStorage.getItem('userId');
  const blogId = localStorage.getItem('blogId');
  const token = localStorage.getItem('access_blog_token');
  history.pushState(null, null, `/blogs/${blogId}`);

  const data = {
    title: $('input#blog_title').val(),
    description: $('input#blog_desc').val(),
  };

  $.ajax({
    url: `${blogId}/update`,
    type: 'PATCH',
    cache: false,
    data: data,
    headers: {
      authorization: `Bearer ${token}`,
    },
    success: function () {
      document.location.assign(`/profile/${userId}`);
    },
    error: function (jqXHR, textStatus, err) {
      alert('text status ' + textStatus + ', err ' + err);
      document.location.assign(`/profile/${userId}`);
    },
  });

  console.log('update blog');
});

//выпдающее меню профиля
$('.arrow-down').click(function (event) {
  event.preventDefault();
  $('.profile-list').toggleClass('show');
});

//Поставить лайк к посту
$('img.add-like').click(function (event) {
  event.preventDefault();
  const postId = $(this).closest('.card').attr('data-id');
  console.log(postId, 'postId');
  $.ajax({
    url: `/posts/like/${postId}`,
    type: 'POST',
    cache: false,
    success: function (data) {
      console.log('data', data);
    },
    error: function (jqXHR, textStatus, err) {
      alert('text status ' + textStatus + ', err ' + err);
    },
  });
});

//Добавить в избранное
$('#add_favorite').click(function (event) {
  event.preventDefault();
  const postId = $(this).closest('.card').attr('data-id');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('access_blog_token');
  const data = {
    postId,
    userId,
  };
  $.ajax({
    url: `/posts/favorite/${postId}`,
    type: 'POST',
    cache: false,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: data,
    success: function (data) {
      console.log('data', data);
    },
    error: function (jqXHR, textStatus, err) {
      alert('text status ' + textStatus + ', err ' + err);
    },
  });
});
