/* eslint-disable */
!function () {

    function parse(string) {
        if (string[0] !== '{') throw new Error('This is not a JSON');
        var i = 1, l = string.length,
            inStr = false,
            layer = 1;
        for (; i < l && layer !== 0; i++) {
            switch (string[i]) {
                case '"':
                    inStr = !inStr;
                    break;
                case '{':
                    if (!inStr) layer += 1;
                    break;
                case '}':
                    if (!inStr) layer -= 1;
                    break;
            }
        }
        if (layer === 0) return { data: JSON.parse(string.substring(0, i)), length: i };
    }

    function send(description, cb) {
        var xhr = new XMLHttpRequest(),
            path = '/?query=' + encodeURIComponent(description),
            i = 0;
        xhr.open('GET', path, true);
        xhr.onprogress = function () {
            var res = parse(xhr.responseText.substring(i).trim());
            if (res) {
                i += res.length;
                cb(res.data);
            }
        }
        xhr.send();
    }

    var DB = {
        stack: [],
        timeouter: null,
        send: function (description, param, cb) {
            if (cb) description = [description, '(', JSON.stringify(param), ')'].join('');
            if (!cb) cb = param;
            this.stack.push([description, cb]);
            this.emit();
            return this;
        },
        emit: function () {
            var self = this;
            clearTimeout(this.timeouter);
            this.timeouter = setTimeout(function () {
                var stack = [].slice.call(self.stack, 0);
                self.stack.length = 0;
                send(
                    '[' + stack.map(function (v) { return v[0] }).join(',') + ']',
                    function (data) {
                        stack[data.seq][1](data.result);
                    }
                );	
            }, 0);
        }
    };

    window.DB = DB;
}();
/* eslint-enable */
