var appKey    = "YOUR_APPKEY";
var clientKey = "YOUR_CLIENTKEY";
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn()
{
    //起動時にmobile backend APIキーを設定
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();
    
    var user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);
    
    // 任意フィールドに値を追加 
    user.signUpByAccount()
        .then(function(user) {
            alert("新規登録に成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function(error) {
            alert("新規登録に失敗！次のエラー発生：" + error.text);
        });
}

function onLoginBtn()
{
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    ncmb.User.logIn(username, password)
        .then(function(user) {
            alert("ログイン成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function(user, error) {
            alert("ログイン失敗！次のエラー発生: " + error.text);
        });
}

function onLogoutBtn()
{
    ncmb.User.logOut();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}
