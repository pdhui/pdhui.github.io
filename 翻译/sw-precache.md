[原文地址](https://github.com/GoogleChrome/sw-precache)

## 注意事项
- 使用service worker做缓存应该被考虑作为一个渐进增强的技术。所以你应该通过
`if('serviceWorker' in navigator)`检测它是否被所用的浏览器所支持，如果支持才注册service worker。
- 一旦service worker安装完成后，所有被缓存的请求资源将会通过被运行在独立线程中的service worker 获取。必须明确的知道你配置在`dynamicUrlToDependencies `和`staticFileGlobs`选项中的值，因为如果配置了不怎么重要的资源，如一张大图片，而它又不是每个页面都有，这将会导致浏览器下载了更多的数据，而却不怎么用到。
- 不是所有类型的资源都适用于precaching。可以参考[ Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)的缓存策略，配合sw-precache来为用户提供最佳体验。如果你要实现额外的缓存逻辑，可以把代码写在一个独立的js文件，然后使用`importScripts()`方法包含它进来。
- sw-precache使用缓存优先策略，所以可以直接从缓存里面获取内容，而不用消耗网络流量。这个策略的一个相关的有用例子是：当有新的有效内容时，显示一个toast/alert给你的用户，用户可以选择重新加载页面来获取新的内容（service worker已经将资源加入缓存，和将会在下次页面加载时生效。）[例子](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js)示例了你能够监听service worker的生命周期事件来触发这个消息。