// ==UserScript==
// @name         Faster Bing
// @name:en      Faster Bing
// @namespace    https://coderjiang.com
// @version      1.1.2
// @description  将 Bing 的重定向 url 转换为真实 url
// @description:en  Convert Bing's redirect url to a real url
// @author       CoderJiang
// @match        https://www.bing.com/*
// @match        http://www.bing.com/*
// @match        http://cn.bing.com/*
// @match        https://cn.bing.com/*
// @icon         https://cdn.coderjiang.com/pic-go/2024/faster-bing-logo-v1.png!pure
// @license      MIT
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const Config = {
        /**
         * 日志配置
         * log.enable 是否打印日志
         * log.success.icon 成功的图标
         * log.fail.icon 失败的图标
         * log.success.originalLink.maxLength 原始链接最大长度，如果为-1则不截断
         * log.success.originalLink.frontChars 原始链接前面保留的字符数
         * log.success.realLink.maxLength 真实链接最大长度，如果为-1则不截断
         * log.success.realLink.frontChars 真实链接前面保留的字符数
         * log.fail.originalLink.maxLength 原始链接最大长度，如果为-1则不截断
         * log.fail.originalLink.frontChars 原始链接前面保留的字符数
         * log.fail.realLink.display 失败时不显示真实链接，用这个字符串代替
         */
        log: {
            enable: true,
            success: {
                icon: '✅',
                originalLink: {
                    maxLength: 30,
                    frontChars: 10,
                },
                realLink: {
                    maxLength: 30,
                    frontChars: 20,
                }
            },
            fail: {
                icon: '❎',
                originalLink: {
                    maxLength: -1,
                    frontChars: 20,
                },
                realLink: {
                    display: '------',
                }
            }
        }
    }
    const logo = `
   ________)                  ______
  (, /                       (, /    ) ,
    /___, _   _  _/_  _  __    /---(    __   _
 ) /     (_(_/_)_(___(/_/ (_) / ____)_(_/ (_(_/_
(_/                        (_/ (           .-/
                                          (_/`;

    /**
     * 获取url中的参数
     *
     * @param url   url
     * @param key   参数名
     * @returns {string}    参数值，如果没有则返回null
     */
    function getUrlParameter(url, key) {
        const parsedUrl = new URL(url);
        const queryParams = parsedUrl.searchParams;
        return queryParams.get(key);
    }

    /**
     * 判断是否是bing的重定向url
     *
     * @param url   url
     * @returns {boolean}   是否是bing的重定向url
     */
    function isBingRedirectUrl(url) {
        const pattern = /^https?:\/\/(.*\.)?bing\.com\/(ck\/a|aclick)/;
        return pattern.test(url);
    }

    /**
     * 判断url是否有效
     * @param urlString url字符串
     * @returns {boolean}   是否是有效的url
     */
    function isValidUrl(urlString) {
        try {
            new URL(urlString);
            return true; // 没有抛出异常，URL有效
        } catch (error) {
            return false; // 抛出异常，URL无效
        }
    }

    /**
     * 将重定向url转换为真实url
     * @param url   Bing的重定向url，必须包含参数 u
     * @returns {string|null}   真实url，转换失败则返回null
     */
    function redirect2RealUrl(url) {
        let urlBase64 = getUrlParameter(url, 'u')
        urlBase64 = urlBase64.replace(/^a1/, '');
        let realUrl = ''
        try {
            // 还原Base64 URL编码中的特殊字符以便解码
            realUrl = atob(urlBase64.replace(/_/g, '/').replace(/-/g, '+'));
        } catch (error) {
            return null;
        }
        // 解码后的 URL 可能包含特殊字符，例如 http%3a%2f%2fpuaai.net
        realUrl = decodeURIComponent(realUrl);
        // 检查 realUrl 是否是有效的相对路径（以 '/' 开头）
        if (realUrl.startsWith('/')) {
            // 获取当前协议和域
            let currentUrl = window.location.origin; // e.g., "https://www.bing.com"

            // 将相对路径追加到当前 URL
            realUrl = currentUrl + realUrl;
        }

        if (!isValidUrl(realUrl)) {
            return null;
        }
        return realUrl;
    }

    /**
     * 找到所有的链接并转换为真实url
     * @returns {{failedUrls: *[], urls: *[], count: number}}
     */
    function convertBingRedirectUrls() {
        const failedUrls = [];
        const processedUrls = [];
        const links = document.querySelectorAll("a");
        for (const link of links) {
            const href = link.href;
            if (isBingRedirectUrl(href)) {
                const realUrl = redirect2RealUrl(href);
                if (realUrl) {
                    link.href = realUrl;
                    processedUrls.push({
                        realUrl,
                        originalUrl: href
                    });
                } else {
                    failedUrls.push(href);
                }
            }
        }
        return {
            processedUrls,
            failedUrls
        };
    }

    /**
     * 可视化结果
     *
     * @param result    结果
     */
    function log(result) {
        function middleTruncate(str, maxLength, frontChars) {
            if (maxLength < 0) return str;
            if (str.length > maxLength) {
                const backChars = maxLength - frontChars - 3; // 确保总长度不超过maxLength
                return str.substring(0, frontChars) + '...' + str.substring(str.length - backChars);
            } else {
                return str;
            }
        }

        const overview = {
            "Success": result.processedUrls.length,
            "Failed": result.failedUrls.length,
        }
        const details = [];
        const successSample = {
            "Status": Config.log.success.icon,
            "Original": "",
            "Real": "",
        }
        const failedSample = {
            "Status": Config.log.fail.icon,
            "Original": "",
            "Real": Config.log.fail.realLink.display,
        }
        for (const processedUrl of result.processedUrls) {
            const success = {...successSample};
            success.Original = middleTruncate(
                processedUrl.originalUrl,
                Config.log.success.originalLink.maxLength,
                Config.log.success.originalLink.frontChars);
            success.Real = middleTruncate(
                processedUrl.realUrl,
                Config.log.success.realLink.maxLength,
                Config.log.success.realLink.frontChars);
            details.push(success);
        }
        for (const failedUrl of result.failedUrls) {
            const failed = {...failedSample};
            failed.Original = middleTruncate(failedUrl,
                Config.log.fail.originalLink.maxLength,
                Config.log.fail.originalLink.frontChars);
            details.push(failed);
        }

        console.table(overview);
        console.table(details);
    }

    console.log(logo);

    const result = convertBingRedirectUrls();
    if (Config.log.enable) {
        log(result)
    }

    // fix: 兼容 Edge 浏览器，解决在第二次搜索时无法解析的问题
    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(node => {
                if (node.id === 'b_content') {
                    const result = convertBingRedirectUrls();
                    if (Config.log.enable) {
                        log(result)
                    }
                }
            });
        });
    }).observe(document.body, {
        childList: true,
        subtree: false,
    });

})();