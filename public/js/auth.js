//авторизация
$(function () {
  console.log('auth.js start');
  const token = localStorage.getItem('access_blog_token');
  const userId = localStorage.getItem('userId');
  const blogId = localStorage.getItem('blogId');

  if (!token) {
    const amirToken = getURLParameter('token');
    const x_sign = getURLParameter('x_sign');

    if (amirToken && x_sign) {
      $.ajax({
        url: '/auth/profile',
        type: 'GET',
        cache: false,
        headers: {
          'authorization': amirToken,
          'x-sign': x_sign,
        },
        data: { amirToken, x_sign },
        success: function (data) {
          console.log(data);
          localStorage.setItem('access_blog_token', data.access_blog_token);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('blogId', data.user.blog.id);
          setProfileLink(data.user.id);
          showHidden(blogId);
        },
        error: function (jqXHR, textStatus, err) {
          console.log('text status ' + textStatus + ', err ' + err);
        },
      });
    }
  }

  if (token && userId && blogId) {
    setProfileLink(userId);
    showHidden(blogId);
  }
});

function setProfileLink(userId) {
  const profileLink = $('a#profileLink');
  const profileUrl = $(profileLink).attr('href') + `/${userId}`;
  $(profileLink).attr('href', profileUrl);
}

function showHidden(blogId) {
  const userBlogId =
    $('#account').attr('data-blog') || $('.tl_article').attr('data-blog');

  $('#userNavigation').show();
  $('.nav-item.editor').show();
  $('.empty-post').show();

  if (userBlogId == blogId) {
    $('.tl_article_buttons').show();
    $('#updateProfile').show();
    $('#updateBlog').show();
    $('#account input').each(function (index, input) {
      input.removeAttribute('readonly');
      input.classList.remove('input-hidden');
    });
  }
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
