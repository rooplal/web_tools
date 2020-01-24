<!DOCTYPE html>
<html dir="ltr">
  <!-- Saved from https://www.bloggerbyte.net -->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Convert Line Break to Paragraph</title>
    <link href="img/favicon.ico" rel="shortcut icon">
    <style>
    *{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}html{background-color:white;font:normal normal 13px/1.4 Helmet,FreeSans,Sans-Serif;color:black;padding:1em}a{color:blue;text-decoration:none}a:focus,a:hover{text-decoration:underline}button,input,select,textarea{display:inline-block;vertical-align:middle;background-color:#ffa;border:1px solid;font:inherit;line-height:normal;padding:2px;width:12em}label{display:inline-block;cursor:pointer;line-height:normal;overflow:hidden}button::-moz-focus-inner,input::-moz-focus-inner{margin:0;padding:0;border:0}button,input[type=button],input[type=reset],input[type=submit]{background-color:black;border-color:transparent;color:white;padding-right:6px;padding-left:6px;cursor:pointer;width:auto}input[type=checkbox],input[type=file],input[type=image],input[type=radio]{width:auto;height:auto;min-width:0;min-height:0;margin:0;padding:0;background:0 0;border:0}input[type=file]{font-size:86%;cursor:pointer}label input[type=checkbox],label input[type=radio]{display:block;float:left;margin:.15em .25em 0 0}p{margin:0 0 1em}textarea{width:100%;min-height:30em;font-family:"Courier New",Courier,"Nimbus Mono L",Monospace;resize:vertical}fieldset,iframe{display:block;border:1px solid;margin:0 0 1em;padding:.5em 1em 1em}fieldset fieldset,fieldset+p,main+p{margin-bottom:0}fieldset fieldset+fieldset{margin-top:1em}iframe{padding:0;border:0;width:100%;height:30em}legend{font-weight:bold;padding:0 .2em}hr{border:0;border-top:1px solid;color:inherit;height:0;margin:0 0 1em}main{margin-bottom:1em;*zoom:1;overflow:hidden}main:after{content:"";display:table;clear:both}main>div{width:50%;float:left}main>div+div{float:right}main>div>fieldset{margin:0 .5em 0 0}main>div+div>fieldset{margin:0 0 0 .5em}main>div:only-child{width:100%}@media(max-width:600px){main>div,main>div+div{float:none;display:block;width:auto}main>div+div{margin-top:1em}main>div>fieldset,main>div+div>fieldset{margin-right:0;margin-left:0}}
    </style>
  </head>
  <body>
    <fieldset>
      <legend>Settings</legend>
      <label><input type="checkbox" id="p" checked> Convert Line Break to Paragraph</label>
      <br>
      <label><input type="checkbox" id="b" checked> Blogger</label>
      <br>
      <br>
      <label><input type="text" id="x" value="blink, marquee" placeholder="blink, marquee"> &larr; tags to remove</label>
    </fieldset>
    <main>
      <div>
        <fieldset>
          <legend>Input</legend>
          <textarea id="input"></textarea>
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Output</legend>
          <textarea id="output"></textarea>
        </fieldset>
      </div>
    </main>
    <fieldset>
      <legend>Preview</legend>
      <iframe id="view"></iframe>
    </fieldset>
    <p>&copy; 2016 <a href="https://www.blogerbyte.net">BloggerByte.Net</a></p>
    <script type="text/javascript">
    (function(w, d) {

var IGNORE = 'h[1-6]|kbd|math|pre|script|style|textarea',
    I = 'a|abbr|acronym|b|basefont|bdo|big|blink|button|cite|code|del|dfn|em|font|i|img|input|ins|kbd|listing|mar(?:k|quee)|nextid|nobr|q|r[pt]|ruby|s|samp|select|small|spacer|span|strike|strong|su[bp]|svg|textarea|time|tt|u|var|w?br|xm',
    B = 'blockquote|div|p',
    AUTO = 'dd|div|(?:fig)?caption|li|td',
    Z = '>|\\s[^<>]*?>',
    ZZ = ' *\\/?>|\\s[^<>]*? *\\/?>';

function trim(text) {
    return text.replace(/^\s*|\s*$/g, "");
}

// JavaScript version of <bloggerbyte>
function paragraph(text) {
    function p(t) {
        t = t.replace(RegExp('(<(?:' + B + '|' + AUTO + ')(?:' + Z + '))', 'g'), '$1\n\n');
        t = t.replace(RegExp('(<\/(?:' + B + '|' + AUTO + ')>)', 'g'), '\n\n$1');
        var tt = t.split(/(\n\s*){2,}/),
            oo = "";
        for (var i = 0, len = tt.length; i < len; ++i) {
            var s = trim(tt[i]);
            if (s.length && (s[0] !== '<' || s.match(RegExp('^<(?:' + I + ')[\\s>]')))) {
                s = s.replace(/\n\s*/g, '<br>');
                oo += '\n<p>' + s + '</p>\n';
            } else {
                oo += s;
            }
        }
        return fix(oo);
    }
    function fix(u) {
        var ii = AUTO.split('|');
        for (var i in ii) {
            var t = ii[i];
            u = u.replace(RegExp('<(' + t + ')(' + Z + ')\\n*<p(?:' + Z + ')([^\\n]*?)<\\/p>\\n*<\\/' + t + '>', 'g'), '<$1$2$3</$1>');
        }
        return u;
    }
    text = text.replace(/\r\n|\r/g, '\n') + '\n\n';
    text = text.replace(RegExp('\\s*<br(' + ZZ + ')\\s*', 'g'), '\n');
    var o = [];
    text.replace(RegExp('([\\s\\S]*?)(<\\/?(?:' + IGNORE + '|p)(?:' + Z + ')|<!\-\-[\\s\\S]*?\-\->|$)', 'g'), function(a, b, c) {
        if (b) o.push(b);
        if (c) o.push(c);
    });
    var output = "",
        skip = 0;
    for (var i = 0, len = o.length; i < len; ++i) {
        var s = o[i];
        if (s.length && s[0] === '<' && s.slice(-1) === '>') {
            skip = s[1] && (s[1] === '/' || s[1] === '!') ? 0 : 1;
            output += s;
        } else {
            output += !skip ? p(s) : s;
        }
    }
    return tidy(output);
}

function tidy(text) {
    text = trim(text);
    text = text.replace(RegExp('<(\\/?[^\\s]+?)(' + Z + ')', 'g'), '\n\n<$1$2\n\n');
    text = text.replace(RegExp('\\n*<(\\/?(?:' + I + '))(' + Z + ')\\n*', 'g'), '<$1$2');
    text = text.replace(/(^|[^>])\n+\s*</g, '$1<');
    text = text.replace(/>\n+\s*([^<]|$)/g, '>$1');
    var ii = IGNORE.split('|');
    for (var i in ii) {
        var t = ii[i];
        text = text.replace(RegExp('\\n*<(' + t + ')(' + Z + ')\\n*([\\s\\S]*?)\\n*<\\/' + t + '>\\n*'), '\n<$1$2$3</$1>\n');
    }
    text = text.replace(RegExp('><(hr|img|input|svg)(' + Z + ')<(?!\\/)', 'g'), '>\n<$1$2\n<');
    text = text.replace(RegExp('<\\/(' + IGNORE + ')>\\n+<(' + IGNORE + ')(' + Z + ')', 'g'), '</$1>\n<$2$3');
    text = text.replace(RegExp('<scr' + 'ipt(' + Z + ')\\n*([\\s\\S]+?)\\n*<\\/scr' + 'ipt>', 'g'), '<scr' + 'ipt$1\n$2\n<\/scr' + 'ipt>');
    text = text.replace(RegExp('<st' + 'yle(' + Z + ')\\n*([\\s\\S]+?)\\n*<\\/st' + 'yle>', 'g'), '<st' + 'yle$1\n$2\n</st' + 'yle>');
    text = text.replace(RegExp('<([-:\\w]+?)(' + Z + ')\\s*<\\/([-:\\w]+?)>', 'g'), '<$1$2</$3>');
    text = text.replace(/<br>/g, '<br>\n');
    return trim(text);
}

// Validator(s) ...
function validate(text) {
    // remove inline style(s)
    var bold = ['b', 'span', 'strong'], t;
    for (var i in bold) {
        t = bold[i];
        text = text.replace(RegExp('<' + t + '\\s+style="font-weight:\\s*bold;?">(.*?)<\\/' + t + '>', 'g'), '<strong>$1</strong>');
    }
    var italic = ['em', 'i', 'span'];
    for (var i in italic) {
        t = italic[i];
        text = text.replace(RegExp('<' + t + '\\s+style="font-style:\\s*italic;?">(.*?)<\\/' + t + '>', 'g'), '<em>$1</em>');
    }
    // replace `<b>` with `<strong>`, `<i>` with `<em>`, other(s) with `<span>`
    text = text.replace(RegExp('<b(' + Z + ')(.*?)<\\/b>', 'g'), '<strong$1$2</strong>');
    text = text.replace(RegExp('<i(' + Z + ')(.*?)<\\/i>', 'g'), '<em$1$2</em>');
    text = text.replace(RegExp('<font(' + Z + ')(.*?)<\\/font>', 'g'), '<span$1$2</span>');
    // replace `<strike>` with `<del>`
    text = text.replace(RegExp('<strike(' + Z + ')(.*?)<\\/strike>', 'g'), '<del$1$2</del>');
    // replace `<acronym>` with `<abbr>`
    text = text.replace(RegExp('<acronym(' + Z + ')(.*?)<\\/acronym>', 'g'), '<abbr$1$2</abbr>');
    // replace `<center>` tag
    text = text.replace(RegExp('<center(' + Z + ')([\\s\\S]*?)<\\/center>', 'g'), '<div class="text-center"$1$2</div>');
    // remove tag(s)
    var remove = d.getElementById('x');
        remove = remove ? remove.value.split(/\s*,\s*|\s+/) : ['blink', 'marquee'];
    for (var i in remove) {
        t = remove[i];
        text = text.replace(RegExp('<' + t + '(?:' + Z + ')([\\s\\S]*?)<\\/' + t + '>', 'g'), '$1');
        // handle invalid markup
        text = text.replace(RegExp('<' + t + '(?:' + Z + ')', 'g'), "");
        text = text.replace(RegExp('<\\/' + t + '>', 'g'), "");
    }
    // replace obsolete attribute(s) with inline style(s)
    text = text.replace(/<([-:\w]+?)(.*?) *\/?>/g, function(a, b, c) {
        var attributes = {
            align: 'vertical-align:',
            bgcolor: 'background-color:',
            color: 'color:',
            face: 'font-family:',
            size: 'font-size:',
            style: "" // used to address duplicate `style` tag(s)
        };
        var css = "";
        for (var i in attributes) {
            t = attributes[i];
            c = c.replace(RegExp(' ' + i + '="(.*?)"'), function(a, b) {
                css += t + b + ';';
                return "";
            });
        }
        css = css.replace(/;+/g, ';');
        css = css.replace(/("|;)font-size:(\d+)/g, '$1font-size:$2pt');
        c += ' style="' + css + '"';
        return css ? '<' + b + c + '>' : a;
    });
    // HTML5 self-closed tag(s)
    text = text.replace(RegExp('<([-:\\w]+?)(\\s[^<>]*?)? *\\/?>', 'g'), '<$1$2>');
    // remove `border` and `type` attribute
    text = text.replace(/ (frame)?border="\d+"| type="text\/(css|javascript)"/g, "");
    text = text.replace(/ (frame)?border='\d+'| type='text\/(css|javascript)'/g, "");
    return text;
}

// Blogger
function blogger(text) {
    // replace `http://` or `https://` with `//`
    text = text.replace(/"https?:\/\//g, '"//');
    // other(s)
    text = text.replace(/ id="BLOGGER_PHOTO_ID_\d+"/g, "");
    text = text.replace(RegExp('<div class="separator( [^"]*?)?"(' + Z + ')([\\s\\S]*?)<\\/div>', 'g'), '<figure class="container$1"$2$3</figure>');
    text = text.replace(RegExp('<figure class="separator( [^"]*?)?"(' + Z + ')([\\s\\S]*?)<\\/figure>', 'g'), '<figure class="container$1"$2$3</figure>');
    text = text.replace(/ imageanchor="\d+"/g, "");
    // start: my blog specific markup
    text = text.replace(/ data-codetype=/g, ' data-title=');
    text = text.replace(/<pre rel=/g, '<pre data-title=');
    text = text.replace(/ class="(.*?)"/g, function(a, b) {
        var classes = {
            catatan: 'note',
            compare: false,
            full: 'expand',
            reference: false,
            config: false,
            border: false
        }
        var c = b.split(' '), o = "";
        for (var i in c) {
            if (classes[c[i]] === false) continue;
            o += ' ' + (classes[c[i]] || c[i]);
        }
        return ' class="' + trim(o) + '"';
    });
    text = text.replace(/<table class="/g, '<table class="border ');
    text = text.replace(/<span class="highlight">(.*?)<\/span>/g, '<mark>$1</mark>');
    text = text.replace(/<div class="reference-link">([\s\S]*?)<\/div>/g, '<hr>$1');
    text = text.replace(/\/\/hompimpaalaihumgambreng\./g, '//dte-feed.');
    text = text.replace(/\bJQuery\b/g, 'jQuery');
    text = text.replace(/<(t[rhd]) id=".*?">/g, '<$1>');
    // end: my blog specific markup
    return text;
}

var input = d.getElementById('input'),
    output = d.getElementById('output'),
    p = d.getElementById('p'),
    b = d.getElementById('b'),
    view = d.getElementById('view'),
    ttt = null;

function run(e) {
    var v = input.value;
    if (ttt) w.clearTimeout(ttt);
    ttt = w.setTimeout(function() {
        v = validate(v);
        if (b.checked) v = blogger(v);
        if (p.checked) v = paragraph(v);
        output.value = v;
        view.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(v.replace(/"\/\//g, '"http://') + '<style>html,body{margin:0;padding:.5em}</style>');
    }, 1);
}

input.onkeyup = run;
input.oninput = run;
input.onpaste = run;

p.onchange = run;
b.onchange = run;

})(window, document);
    </script>
  </body>
</html>
