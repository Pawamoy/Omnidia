!function (e) {
    if ("object" == typeof exports)module.exports = e(); else if ("function" == typeof define && define.amd)define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Foswig = e()
    }
}(function () {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a)return a(o, !0);
                    if (i)return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = n[o] = {exports: {}};
                t[o][0].call(f.exports, function (e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, f, f.exports, e, t, n, r)
            }
            return n[o].exports
        }

        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)s(r[o]);
        return s
    })({
        1: [function (_dereq_, module, exports) {
            function Node(e) {
                this.character = e, this.neighbors = []
            }

            function TrieNode() {
                this.children = []
            }

            function addToDuplicatesTrie(e, t) {
                e.length > 1 && addToDuplicatesTrie(e.substr(1), t);
                for (var r = t, o = 0; o < e.length; ++o) {
                    var i = r.children[e[o]];
                    i || (i = new TrieNode, r.children[e[o]] = i), r = i
                }
            }

            function isDuplicate(e, t) {
                e = e.toLowerCase();
                for (var r = t, o = 0; o < e.length; ++o) {
                    var i = r.children[e[o]];
                    if (!i)return !1;
                    r = i
                }
                return !0
            }

            module.exports = function (e) {
                this.order = e, this.duplicates = new TrieNode, this.start = new Node(""), this.map = {}
            }, module.exports.prototype.addWordsToChain = function (e) {
                for (var t = 0; t < e.length; ++t)this.addWordToChain(e[t])
            }, module.exports.prototype.addWordToChain = function (e) {
                addToDuplicatesTrie(e.toLowerCase(), this.duplicates);
                for (var t = this.start, r = "", o = 0; o < e.length; ++o) {
                    var i = e[o];
                    r += i, r.length > this.order && (r = r.substr(1));
                    var n = this.map[r];
                    n || (n = new Node(i), this.map[r] = n), t.neighbors.push(n), t = n
                }
                t.neighbors.push(null)
            }, module.exports.prototype.generateWord = function (e, t, r) {
                "undefined" == typeof e && (e = 0), "undefined" == typeof r && (r = !0), "undefined" == typeof t && (t = -1);
                var o, i;
                do {
                    i = !1;
                    var n = Math.floor(Math.random() * this.start.neighbors.length), h = this.start.neighbors[n];
                    for (o = ""; h && (0 > t || o.length <= t);)o += h.character, n = Math.floor(Math.random() * h.neighbors.length), h = h.neighbors[n];
                    (o.length > t || o.length < e) && (i = !0)
                } while (i || !r && isDuplicate(o, this.duplicates));
                return o
            };
        }, {}]
    }, {}, [1])
    (1)
});