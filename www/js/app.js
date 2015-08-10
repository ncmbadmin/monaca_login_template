var appKey    = "YOUR_APPKEY";
var clientKey = "YOUR_CLIENTKEY";

///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
  NCMB.initialize(appKey, clientKey);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn()
{
    //起動時にmobile backend APIキーを設定
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();
    
    var user = new NCMB.User();
    user.set("userName", username);
    user.set("password", password);
    
    // 任意フィールドに値を追加 
    user.signUp(null, {
        success: function(user) {
            alert("新規登録に成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#DetailPage');
        },
        error: function(user, error) {
            alert("新規登録に失敗！次のエラー発生： " + error.message);
        }
    });
}

function onLoginBtn()
{
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    NCMB.User.logIn(username, password, {
        success: function(user) {
            alert("ログイン成功");
            currentLoginUser = NCMB.User.current();
            $.mobile.changePage('#DetailPage');
        },
        error: function(user, error) {
            alert("ログイン失敗！次のエラー発生: " + error.message);
        }
    });
}

function onLogoutBtn()
{
    NCMB.User.logOut();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}
