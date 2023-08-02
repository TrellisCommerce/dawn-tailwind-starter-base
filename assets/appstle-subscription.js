'use strict';
var appstleInit = function appstleInit() {
  var _RS,
    _RS$Config,
    _RS10,
    _RS10$Config,
    head = document.getElementsByTagName('head')[0],
    startingTime = new Date().getTime(),
    appstleLoadScript = function (e, n, t) {
      var i = document.createElement('script');
      (i.type = n || 'text/javascript'),
        i.readyState
          ? (i.onreadystatechange = function () {
              ('loaded' != i.readyState && 'complete' != i.readyState) ||
                ((i.onreadystatechange = null), t && t());
            })
          : (i.onload = function () {
              t && t();
            }),
        (i.src = e),
        head.appendChild(i);
    };
  if (
    ((null !== (_RS = RS) &&
      void 0 !== _RS &&
      null !== (_RS$Config = _RS.Config) &&
      void 0 !== _RS$Config &&
      _RS$Config.disableLoadingJquery) ||
      appstleLoadScript(
        'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        'text/javascript',
        function () {
          window.appstle_jQuery = jQuery.noConflict(!0);
        },
      ),
    appstleLoadScript(
      'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      'module',
    ),
    'undefined' == typeof Mustache)
  ) {
    var mustacheScript = document.createElement('script');
    (mustacheScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.1.0/mustache.js'),
      (mustacheScript.type = 'text/javascript'),
      head.appendChild(mustacheScript);
  }
  var checkReady = function e(n) {
      var t, i, l, a;
      (null !== (t = RS) &&
      void 0 !== t &&
      null !== (i = t.Config) &&
      void 0 !== i &&
      i.disableLoadingJquery
        ? window.jQuery
        : window.appstle_jQuery) &&
      window.Mustache &&
      window.Shopify
        ? n(
            null !== (l = RS) &&
              void 0 !== l &&
              null !== (a = l.Config) &&
              void 0 !== a &&
              a.disableLoadingJquery
              ? window.jQuery
              : window.appstle_jQuery,
          )
        : window.setTimeout(function () {
            e(n);
          }, 20);
    },
    urlParams = new URLSearchParams(window.location.search),
    globalUrlParameter = urlParams.get('variant');
  function getOrderSellingPlanIds() {
    return Shopify.checkout.line_items.map(function (e) {
      return e.selling_plan_id;
    });
  }
  function isOrderEligibleForThankyouBox() {
    var e = getOrderSellingPlanIds(),
      i = !1;
    return (
      e.length &&
        e.forEach(function (n) {
          var e, t;
          null === (e = RS) ||
            void 0 === e ||
            null === (t = e.Config) ||
            void 0 === t ||
            t.sellingPlansJson.filter(function (e) {
              e.id.includes(n) && (i = !0);
            });
        }),
      i
    );
  }
  if (
    (checkReady(function ($) {
      var jQuery = $;
      $(function () {
        var _window19,
          _window19$RS,
          _window19$RS$Config,
          _jQuery2,
          _window28,
          _window28$RS,
          _window28$RS$Config,
          _window29,
          _window29$RS,
          _window29$RS$Config,
          _window30,
          _window30$RS,
          _window30$RS$Config,
          _window31,
          _window31$RS,
          _window31$RS$Config,
          endingTime = new Date().getTime(),
          tookTime = endingTime - startingTime,
          _RSConfig55;
        function renderWidget(standAloneProduct, standAloneElement, widgetId) {
          if (window.Shopify) {
            var product = RSConfig.product;
            standAloneProduct && (product = standAloneProduct),
              processProductVariants(product);
            var localVariantsByTitle = RSConfig.variantsByTitle,
              localVariantsById = RSConfig.variantsById,
              localWindowVariant;
            RSConfig.showPrepaidPlansSeparately =
              'WIDGET_TYPE_7' === RSConfig.widgetType;
            var widgetLabels = JSON.parse(RS.Config.labels),
              Selling_Plan_Variants_Global = {},
              appstleSubscriptionFunction = function () {
                if (
                  !0 === urlIsProductPage() ||
                  appstleStandAloneSelectorExists()
                ) {
                  var e,
                    n,
                    g,
                    f,
                    _,
                    v,
                    y,
                    m = buildAtcButtonSelector(),
                    b = jQuery(m).first();
                  standAloneElement &&
                    (b = standAloneElement).addClass(
                      'appstle_stand_alone_selector_processed',
                    );
                  var w = '#appstle-subscription-widget-placeholder';
                  b
                    .parents(
                      null === (e = RSConfig) || void 0 === e
                        ? void 0
                        : e.widgetParentSelector,
                    )
                    .find(
                      null === (n = RSConfig) || void 0 === n
                        ? void 0
                        : n.quantitySelector,
                    )
                    .on('change, click', function () {
                      setTimeout(triggerEventsFromInput, 100);
                    }),
                    $(document).on(
                      'click',
                      '#appstle_subscription_widget'.concat(
                        widgetId,
                        ' [data-appstle-icon]',
                      ),
                      function () {
                        $(this).toggleClass('appstle-tooltip-show');
                      },
                    );
                  var l = function () {
                    var e = null;
                    try {
                      (b = jQuery(m).first()),
                        standAloneElement && (b = standAloneElement);
                      var n = detectVariant(f, b, product);
                      if (n) {
                        var t,
                          i = n.id;
                        if (f && f === i) return;
                        if (
                          (product.selling_plan_groups &&
                            0 < product.selling_plan_groups.length &&
                            (t = product.selling_plan_groups.filter(function (
                              e,
                            ) {
                              return 'appstle' === e.app_id;
                            })),
                          t && 0 < t.length && RS.Config.widgetEnabled)
                        ) {
                          var l, a, o, s, r, p;
                          localWindowVariant = n;
                          var c,
                            d = RS.Config.selectors.atcButtonPlacement;
                          if (
                            (_
                              ? (unbindEventListeners(),
                                _.children().remove(),
                                addSubscriptionItems(_, n),
                                (e = createJsonformat()),
                                y ? _.insertBefore(y) : _.appendTo(v))
                              : ((v = jQuery(
                                  '<div class="appstle_sub_widget appstle-hidden" id="appstle_subscription_widget' +
                                    widgetId +
                                    '"></div>',
                                )),
                                (g = RS.Config.purchaseOptionsText
                                  ? jQuery(
                                      '<div class="appstle_widget_title">' +
                                        RS.Config.purchaseOptionsText +
                                        '</div>',
                                    )
                                  : ''),
                                (_ = jQuery(
                                  '<div class="appstle_subscription_wrapper"></div>',
                                )),
                                (y =
                                  RS.Config.tooltipTitle &&
                                  RS.Config.showTooltip &&
                                  !RS.Config.showStaticTooltip
                                    ? jQuery(
                                        '<div data-appstle-icon="" class="appstle_tooltip_wrapper">\n                        <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" class="tooltip_subscription_svg">\n                          <path d="M45 0C20.1827 0 0 20.1827 0 45C0 69.8173 20.1827 90 45 90C69.8173 90 90 69.8174 90 45C90.0056 44.6025 89.9322 44.2078 89.7839 43.8389C89.6357 43.47 89.4156 43.1342 89.1365 42.8511C88.8573 42.568 88.5247 42.3432 88.158 42.1897C87.7912 42.0363 87.3976 41.9573 87 41.9573C86.6024 41.9573 86.2088 42.0363 85.842 42.1897C85.4753 42.3432 85.1427 42.568 84.8635 42.8511C84.5844 43.1342 84.3643 43.47 84.2161 43.8389C84.0678 44.2078 83.9944 44.6025 84 45C84 66.5748 66.5747 84 45 84C23.4253 84 6 66.5747 6 45C6 23.4254 23.4253 6 45 6C56.1538 6 66.3012 10.5882 73.4375 18H65.4062C65.0087 17.9944 64.614 18.0678 64.2451 18.2161C63.8762 18.3643 63.5405 18.5844 63.2573 18.8635C62.9742 19.1427 62.7494 19.4753 62.596 19.842C62.4425 20.2088 62.3635 20.6024 62.3635 21C62.3635 21.3976 62.4425 21.7912 62.596 22.158C62.7494 22.5247 62.9742 22.8573 63.2573 23.1365C63.5405 23.4156 63.8762 23.6357 64.2451 23.7839C64.614 23.9322 65.0087 24.0056 65.4062 24H79.8125C80.6081 23.9999 81.3711 23.6838 81.9337 23.1212C82.4963 22.5586 82.8124 21.7956 82.8125 21V6.59375C82.821 6.18925 82.7476 5.78722 82.5966 5.41183C82.4457 5.03644 82.2205 4.69545 81.9344 4.40936C81.6483 4.12327 81.3073 3.898 80.9319 3.7471C80.5565 3.5962 80.1545 3.52277 79.75 3.53125C79.356 3.53941 78.9675 3.62511 78.6067 3.78344C78.2458 3.94177 77.9197 4.16963 77.6469 4.45402C77.3741 4.73841 77.16 5.07375 77.0168 5.44089C76.8737 5.80803 76.8042 6.19977 76.8125 6.59375V12.875C68.6156 4.86282 57.3081 0 45 0ZM43.75 20.75C43.356 20.7582 42.9675 20.8439 42.6067 21.0022C42.2458 21.1605 41.9197 21.3884 41.6469 21.6728C41.3741 21.9572 41.16 22.2925 41.0168 22.6596C40.8737 23.0268 40.8042 23.4185 40.8125 23.8125V47.375C40.8116 47.7693 40.8883 48.16 41.0385 48.5246C41.1886 48.8892 41.4092 49.2207 41.6875 49.5L54.0938 61.9375C54.6573 62.5011 55.4217 62.8177 56.2188 62.8177C57.0158 62.8177 57.7802 62.5011 58.3438 61.9375C58.9073 61.3739 59.224 60.6095 59.224 59.8125C59.224 59.0155 58.9073 58.2511 58.3438 57.6875L46.8125 46.1875V23.8125C46.821 23.408 46.7476 23.006 46.5966 22.6306C46.4457 22.2552 46.2205 21.9142 45.9344 21.6281C45.6483 21.342 45.3073 21.1168 44.9319 20.9658C44.5565 20.8149 44.1545 20.7415 43.75 20.75Z">\n                          </path>\n                        </svg>\n                        <span class="appstle_tooltip_title">'
                                          .concat(
                                            RS.Config.tooltipTitle,
                                            '</span>\n                        <div class="appstle_tooltip">\n                          <div class="appstle_tooltip_content">\n                              ',
                                          )
                                          .concat(
                                            RS.Config.tooltipDesctiption,
                                            '\n                          </div>\n                          ',
                                          )
                                          .concat(
                                            RS.Config.showAppstleLink
                                              ? '<div class="appstle_tooltip_appstle">\n                            <a href="https://appstle.com/" class="appstle_link" target="_blank">\n                              POWERED BY APPSTLE\n                            </a>\n                          </div>'
                                              : '<span></span>',
                                            '\n                                        </div>\n                                      </div>',
                                          ),
                                      )
                                    : RS.Config.showTooltip &&
                                      RS.Config.showStaticTooltip &&
                                      jQuery(
                                        '<div class="appstle_tooltip_wrapper_static">'.concat(
                                          RS.Config.tooltipDesctiption,
                                          '</div>',
                                        ),
                                      )),
                                g && g.appendTo(v),
                                addSubscriptionItems(_, n),
                                (e = createJsonformat()),
                                _.appendTo(v),
                                y && y.appendTo(v)),
                            null === (l = product) ||
                              void 0 === l ||
                              !l.available)
                          )
                            if (
                              'false' ==
                              (null === (c = RS.Config) || void 0 === c
                                ? void 0
                                : c.widgetEnabledOnSoldVariant)
                            )
                              return;
                          jQuery(w).length && (b = jQuery(w).first());
                          var u =
                            null === (a = RSConfig) || void 0 === a
                              ? void 0
                              : null === (o = a.widgetTemplateHtml) ||
                                void 0 === o
                              ? void 0
                              : null === (s = o.replace('{% raw %}', '')) ||
                                void 0 === s
                              ? void 0
                              : s.replace('{% endraw %}', '');
                          null !== (r = e) &&
                            void 0 !== r &&
                            null !== (p = r.sellingPlanVariants) &&
                            void 0 !== p &&
                            p.length &&
                            u &&
                            (v && jQuery(v).remove(),
                            (v = jQuery(Mustache.render(u, e)))),
                            'BEFORE' === d
                              ? v.insertBefore(b)
                              : 'AFTER' === d
                              ? v.insertAfter(b)
                              : 'FIRST_CHILD' === d
                              ? v.prependTo(b)
                              : 'LAST_CHILD' === d && v.appendTo(b),
                            updateWidgetElements(),
                            jQuery(document).trigger('appstle_widget_updated');
                        }
                        f = i;
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  };
                  setTimeout(function () {
                    l(), updateWidgetUIBasedOnQueryParams();
                  }, 13),
                    attachMutationObserver('[name="id"]', l),
                    standAloneElement
                      ? (standAloneElement
                          .closest('form[action$="/cart/add"]')
                          .on('change', function () {
                            var e, n;
                            setTimeout(
                              function () {
                                var e, n, t, i;
                                (l(),
                                updateHistoryState(),
                                null !== (e = window) &&
                                  void 0 !== e &&
                                  e._transcy) &&
                                  (null === (n = window) ||
                                    void 0 === n ||
                                    null === (t = n._transcy) ||
                                    void 0 === t ||
                                    null === (i = t.methods) ||
                                    void 0 === i ||
                                    i.reConvertCurrency());
                              },
                              0 <
                                parseInt(
                                  null === (e = RSConfig) || void 0 === e
                                    ? void 0
                                    : e.scriptLoadDelay,
                                )
                                ? parseInt(
                                    null === (n = RSConfig) || void 0 === n
                                      ? void 0
                                      : n.scriptLoadDelay,
                                  )
                                : 30,
                            );
                          }),
                        standAloneElement
                          .closest('form[action$="/cart/add"]')
                          .on('click', function () {
                            var e, n;
                            setTimeout(
                              function () {
                                var e, n, t, i;
                                (l(),
                                updateHistoryState(),
                                null !== (e = window) &&
                                  void 0 !== e &&
                                  e._transcy) &&
                                  (null === (n = window) ||
                                    void 0 === n ||
                                    null === (t = n._transcy) ||
                                    void 0 === t ||
                                    null === (i = t.methods) ||
                                    void 0 === i ||
                                    i.reConvertCurrency());
                              },
                              0 <
                                parseInt(
                                  null === (e = RSConfig) || void 0 === e
                                    ? void 0
                                    : e.scriptLoadDelay,
                                )
                                ? parseInt(
                                    null === (n = RSConfig) || void 0 === n
                                      ? void 0
                                      : n.scriptLoadDelay,
                                  )
                                : 30,
                            );
                          }),
                        standAloneElement
                          .closest('form[action$="/cart/add"]')
                          .find('*')
                          .on('click', function () {
                            var e, n;
                            setTimeout(
                              function () {
                                var e, n, t, i;
                                (l(),
                                updateHistoryState(),
                                null !== (e = window) &&
                                  void 0 !== e &&
                                  e._transcy) &&
                                  (null === (n = window) ||
                                    void 0 === n ||
                                    null === (t = n._transcy) ||
                                    void 0 === t ||
                                    null === (i = t.methods) ||
                                    void 0 === i ||
                                    i.reConvertCurrency());
                              },
                              0 <
                                parseInt(
                                  null === (e = RSConfig) || void 0 === e
                                    ? void 0
                                    : e.scriptLoadDelay,
                                )
                                ? parseInt(
                                    null === (n = RSConfig) || void 0 === n
                                      ? void 0
                                      : n.scriptLoadDelay,
                                  )
                                : 30,
                            );
                          }))
                      : (jQuery(document).on('change', function (e) {
                          var n, t;
                          setTimeout(
                            function () {
                              var e, n, t, i;
                              (l(),
                              updateHistoryState(),
                              null !== (e = window) &&
                                void 0 !== e &&
                                e._transcy) &&
                                (null === (n = window) ||
                                  void 0 === n ||
                                  null === (t = n._transcy) ||
                                  void 0 === t ||
                                  null === (i = t.methods) ||
                                  void 0 === i ||
                                  i.reConvertCurrency());
                            },
                            0 <
                              parseInt(
                                null === (n = RSConfig) || void 0 === n
                                  ? void 0
                                  : n.scriptLoadDelay,
                              )
                              ? parseInt(
                                  null === (t = RSConfig) || void 0 === t
                                    ? void 0
                                    : t.scriptLoadDelay,
                                )
                              : 30,
                          );
                        }),
                        jQuery('[name=id]').on('change', function () {
                          var e, n;
                          setTimeout(
                            function () {
                              var e, n, t, i;
                              (l(),
                              updateHistoryState(),
                              null !== (e = window) &&
                                void 0 !== e &&
                                e._transcy) &&
                                (null === (n = window) ||
                                  void 0 === n ||
                                  null === (t = n._transcy) ||
                                  void 0 === t ||
                                  null === (i = t.methods) ||
                                  void 0 === i ||
                                  i.reConvertCurrency());
                            },
                            0 <
                              parseInt(
                                null === (e = RSConfig) || void 0 === e
                                  ? void 0
                                  : e.scriptLoadDelay,
                              )
                              ? parseInt(
                                  null === (n = RSConfig) || void 0 === n
                                    ? void 0
                                    : n.scriptLoadDelay,
                                )
                              : 30,
                          );
                        }),
                        jQuery(document).on('click', function () {
                          var e, n;
                          setTimeout(
                            function () {
                              var e, n, t, i;
                              (l(),
                              updateHistoryState(),
                              null !== (e = window) &&
                                void 0 !== e &&
                                e._transcy) &&
                                (null === (n = window) ||
                                  void 0 === n ||
                                  null === (t = n._transcy) ||
                                  void 0 === t ||
                                  null === (i = t.methods) ||
                                  void 0 === i ||
                                  i.reConvertCurrency());
                            },
                            0 <
                              parseInt(
                                null === (e = RSConfig) || void 0 === e
                                  ? void 0
                                  : e.scriptLoadDelay,
                              )
                              ? parseInt(
                                  null === (n = RSConfig) || void 0 === n
                                    ? void 0
                                    : n.scriptLoadDelay,
                                )
                              : 30,
                          );
                        }));
                }
                if (!0 === urlIsAccountPage()) {
                  var t = RSConfig.selectors.subscriptionLinkSelector,
                    i = RSConfig.selectors.subscriptionLinkPlacement,
                    a = RSConfig.manageSubscriptionBtnFormat;
                  'after' === i.toLowerCase()
                    ? jQuery(t).after(a)
                    : 'first_child' === i.toLowerCase()
                    ? jQuery(a).prependTo(t)
                    : 'last_child' === i.toLowerCase()
                    ? jQuery(a).appendTo(t)
                    : jQuery(t).before(a),
                    accountPageStyle();
                }
              };
            if (
              (deferJquery(appstleSubscriptionFunction),
              jQuery(RSConfig.priceSelector).length)
            ) {
              var _targetNode = document.querySelector(
                  '.product__info-wrapper div.no-js-hidden',
                ),
                config1 = { attributes: !0, childList: !0, subtree: !0 },
                callback = function (e, n) {
                  jQuery(
                    RSConfig.priceSelector +
                      '[data-appstle-price-modified="true"]',
                  ).length || updateSellingPlanValueToFinalPrice();
                },
                _observer = new MutationObserver(callback);
              _targetNode && config1 && _observer.observe(_targetNode, config1);
            }
            dispatchAppstleEvent('widgetInitialised');
          }
          function processProductVariants(e) {
            if (e) {
              for (
                var n = e.variants, t = {}, i = {}, l = 0;
                l < n.length;
                l++
              ) {
                var a = n[l];
                (t[a.title] = Object.assign({}, a)),
                  (i[a.id] = Object.assign({}, a));
              }
              (RSConfig.variantsByTitle = t), (RSConfig.variantsById = i);
            }
          }
          function detectVariant(e, n, t) {
            var i,
              l,
              a,
              o,
              s,
              r,
              p,
              c,
              d,
              u,
              g = urlParam('variant');
            return g &&
              null !== (i = RSConfig) &&
              void 0 !== i &&
              i.detectVariantFromURLParams
              ? localVariantsById[g]
              : (0 <
                  n.closest('form[action$="/cart/add"]').find('[name=id]')
                    .length &&
                  n.closest('form[action$="/cart/add"]').find('[name=id]')[0]
                    .value) ||
                (null !== (l = RSConfig) &&
                void 0 !== l &&
                l.widgetParentSelector
                  ? 0 <
                      n
                        .closest(
                          null === (a = RSConfig) || void 0 === a
                            ? void 0
                            : a.widgetParentSelector,
                        )
                        .find('[name=id]').length &&
                    n
                      .closest(
                        null === (o = RSConfig) || void 0 === o
                          ? void 0
                          : o.widgetParentSelector,
                      )
                      .find('[name=id]')
                      .val()
                  : void 0) ||
                (n
                  .parents('html')
                  .find('form[action$="/cart/add"]')
                  .find('[name=id]').length &&
                  null !==
                    (s = n
                      .parents('html')
                      .find('form[action$="/cart/add"]')
                      .find('[name=id]')[0]) &&
                  void 0 !== s &&
                  s.value)
              ? ((g =
                  (null ===
                    (r = n
                      .closest('form[action$="/cart/add"]')
                      .find('[name=id]')[0]) || void 0 === r
                    ? void 0
                    : r.value) ||
                  n
                    .closest(
                      null === (p = RSConfig) || void 0 === p
                        ? void 0
                        : p.widgetParentSelector,
                    )
                    .find('[name=id]')
                    .val() ||
                  (null ===
                    (c = n
                      .parents('html')
                      .find('form[action$="/cart/add"]')
                      .find('[name=id]')[0]) || void 0 === c
                    ? void 0
                    : c.value)),
                localVariantsById[g])
              : g
              ? localVariantsById[g]
              : Object.values(localVariantsById).some(function (e) {
                  var n;
                  return (
                    (null == e ? void 0 : e.title) ==
                    (null === (n = $("form select[name='options[Bundle]']")) ||
                    void 0 === n
                      ? void 0
                      : n.val())
                  );
                })
              ? Object.values(localVariantsById).find(function (e) {
                  return (
                    (null == e ? void 0 : e.title) ==
                    $("select[name='options[Bundle]']").val()
                  );
                })
              : ((d = []),
                null !=
                  (u = n
                    .closest('form[action$="/cart/add"]')
                    .find('select.single-option-selector')) &&
                null != u.selectedIndex &&
                -1 !== u.selectedIndex
                  ? d.push(u[u.selectedIndex].value)
                  : d.push(void 0),
                localVariantsByTitle[d.join(' / ')] || t.variants[0]);
          }
          function getSellingPlanAllocation(e, n) {
            return localVariantsById[e].selling_plan_allocations.find(function (
              e,
            ) {
              return e.selling_plan_id === n;
            });
          }
          function compareCustomerTags(e, n) {
            return e.filter(function (e) {
              return -1 != n.indexOf(e);
            });
          }
          function isSellingPlanVisible(e) {
            var n,
              t =
                null === (n = RSConfig) || void 0 === n ? void 0 : n.customerId,
              i = RSConfig.customer_tags || [],
              l = !0;
            if (
              (!t &&
                RSConfig.memberOnlySellingPlansJson &&
                RSConfig.memberOnlySellingPlansJson[e] &&
                RSConfig.memberOnlySellingPlansJson[e]
                  .enableMemberInclusiveTag &&
                (l = !1),
              t &&
                RSConfig.nonMemberOnlySellingPlansJson &&
                RSConfig.nonMemberOnlySellingPlansJson[e] &&
                (l = !1),
              l &&
                t &&
                RSConfig.memberOnlySellingPlansJson &&
                RSConfig.memberOnlySellingPlansJson[e])
            ) {
              if (
                RSConfig.memberOnlySellingPlansJson[e].memberInclusiveTags &&
                RSConfig.memberOnlySellingPlansJson[
                  e
                ].memberInclusiveTags.trim()
              )
                l =
                  0 <
                  compareCustomerTags(
                    i,
                    RSConfig.memberOnlySellingPlansJson[
                      e
                    ].memberInclusiveTags.split(','),
                  ).length;
              if (
                RSConfig.memberOnlySellingPlansJson[e].memberExclusiveTags &&
                RSConfig.memberOnlySellingPlansJson[
                  e
                ].memberExclusiveTags.trim()
              )
                l = !(
                  0 <
                  compareCustomerTags(
                    i,
                    RSConfig.memberOnlySellingPlansJson[
                      e
                    ].memberExclusiveTags.split(','),
                  ).length
                );
            }
            return l;
          }
          function buildSellingPlantText(e) {
            var n =
              e.totalPrice == e.formattedPrice
                ? {
                    sellingPlanName: e.name,
                    sellingPlanPrice: '<span class="transcy-money">'.concat(
                      e.formattedPrice,
                      '</span>',
                    ),
                    secondSellingPlanPrice:
                      '<span class="transcy-money">'.concat(
                        e.secondFormattedPrice,
                        '</span>',
                      ),
                    discountText: null == e ? void 0 : e.discountText,
                    totalPrice: '<span class="transcy-money">'.concat(
                      null == e ? void 0 : e.totalPrice,
                      '</span>',
                    ),
                  }
                : {
                    sellingPlanName: e.name,
                    totalPrice: '<span class="transcy-money">'.concat(
                      null == e ? void 0 : e.totalPrice,
                      '</span>',
                    ),
                    sellingPlanPrice: '<span class="transcy-money">'.concat(
                      e.formattedPrice,
                      '</span>',
                    ),
                    secondSellingPlanPrice:
                      '<span class="transcy-money">'.concat(
                        e.secondFormattedPrice,
                        '</span>',
                      ),
                    discountText: e.discountText,
                  };
            return wrapPriceWithSpanTag(
              Mustache.render(RS.Config.sellingPlanTitleText, n),
            );
          }
          function buildAtcButtonSelector() {
            var e =
                RSConfig.atcButtonSelector ||
                "form[action$='/cart/add'] [type='submit']",
              n = { productId: product.id };
            return (e = Mustache.render(e, n));
          }
          function buildOneTimePriceText(e) {
            var n = { price: e };
            return wrapPriceWithSpanTag(
              Mustache.render(RS.Config.oneTimePriceText, n),
            );
          }
          function buildSubscriptionOptionText(e, n, t, i) {
            var l = { discountValue: n, frequency: t, price: i };
            return wrapPriceWithSpanTag(
              Mustache.render(RS.Config.subscriptionOptionText, l),
            );
          }
          function buildSelectedPriceText(e, n, t) {
            var i = n ? { pricePerDelivery: e, totalPrice: t } : { price: e },
              l = n
                ? RS.Config.selectedPrepaidSellingPlanPriceText
                : RS.Config.selectedPayAsYouGoSellingPlanPriceText;
            return wrapPriceWithSpanTag(Mustache.render(l, i));
          }
          function buildPrepaidPerDeliveryPriceText(e) {
            var n = { prepaidPerDeliveryPrice: e };
            return wrapPriceWithSpanTag(
              Mustache.render(RS.Config.totalPricePerDeliveryText, n),
            );
          }
          function buildSelectedTooltipPrePaidText(e, n) {
            var t = { pricePerDelivery: e, totalPrice: n },
              i = RS.Config.tooltipDescriptionOnPrepaidPlan;
            return wrapPriceWithSpanTag(Mustache.render(i, t));
          }
          function buildSelectedTooltipDiscountText(e, n) {
            var t;
            if (
              2 ==
              (null == e
                ? void 0
                : null === (t = e.price_adjustments) || void 0 === t
                ? void 0
                : t.length)
            ) {
              var i,
                l,
                a = {
                  firstPrice: formatPriceWithQuantity(
                    null == e
                      ? void 0
                      : null === (i = e.price_adjustments[0]) || void 0 === i
                      ? void 0
                      : i.price,
                  ),
                  secondPrice: formatPriceWithQuantity(
                    null == e
                      ? void 0
                      : null === (l = e.price_adjustments[1]) || void 0 === l
                      ? void 0
                      : l.price,
                  ),
                  discountOne: 0 < (null == n ? void 0 : n.length) ? n[0] : '',
                  discountTwo: 2 == (null == n ? void 0 : n.length) ? n[1] : '',
                };
              return wrapPriceWithSpanTag(
                Mustache.render(
                  RS.Config.tooltipDescriptionOnMultipleDiscount,
                  a,
                ),
              );
            }
          }
          function buildTooltipDetailsText(e, n, t) {
            var i = n
                ? {
                    prepaidDetails: e,
                    discountDetails: t,
                    defaultTooltipDescription: RS.Config.tooltipDesctiption,
                  }
                : {
                    defaultTooltipDescription: RS.Config.tooltipDesctiption,
                    discountDetails: t,
                  },
              l = RS.Config.tooltipDescriptionCustomization;
            return wrapPriceWithSpanTag(Mustache.render(l, i));
          }
          function populateDropdown(
            purchaseOptions,
            variant,
            isPrepaidDropdown,
          ) {
            var sellingPlanVariants = [],
              validSellingPlanCounter = 0;
            if (
              (jQuery.each(
                product.selling_plan_groups,
                function (index, sellingPlanGroup) {
                  'appstle' === sellingPlanGroup.app_id &&
                    jQuery.each(
                      sellingPlanGroup.selling_plans,
                      function (subIndex, sellingPlan) {
                        var visible = isSellingPlanVisible(sellingPlan.id);
                        if (visible) {
                          var _RS4,
                            _RS4$Config,
                            _RSConfig8,
                            sellingPlanAllocation = getSellingPlanAllocation(
                              variant.id,
                              sellingPlan.id,
                            );
                          if (!sellingPlanAllocation) return;
                          validSellingPlanCounter++;
                          var price = sellingPlanAllocation.per_delivery_price,
                            totalPrice = formatPriceWithQuantity(
                              null == sellingPlanAllocation
                                ? void 0
                                : sellingPlanAllocation.price,
                            ),
                            formattedPrice = formatPriceWithQuantity(price),
                            compareAtPrice =
                              sellingPlanAllocation.compare_at_price,
                            formattedCompareAtPrice =
                              formatPriceWithQuantity(compareAtPrice),
                            secondPrice = null,
                            secondFormattedPrice = null,
                            discountText;
                          secondFormattedPrice =
                            sellingPlanAllocation &&
                            sellingPlanAllocation.price_adjustments &&
                            2 === sellingPlanAllocation.price_adjustments.length
                              ? ((secondPrice =
                                  sellingPlanAllocation.price_adjustments[1]
                                    .price),
                                formatPriceWithQuantity(secondPrice))
                              : ((secondPrice = price), formattedPrice);
                          var priceAdjustment =
                            null == sellingPlan
                              ? void 0
                              : sellingPlan.price_adjustments[0];
                          discountText =
                            'percentage' !==
                            (null == priceAdjustment
                              ? void 0
                              : priceAdjustment.value_type)
                              ? formatPriceWithQuantity(
                                  null == priceAdjustment
                                    ? void 0
                                    : priceAdjustment.value,
                                )
                              : (null == priceAdjustment
                                  ? void 0
                                  : priceAdjustment.value) + '%';
                          var jsonOfSellingPlans =
                            null === (_RS4 = RS) || void 0 === _RS4
                              ? void 0
                              : null === (_RS4$Config = _RS4.Config) ||
                                void 0 === _RS4$Config
                              ? void 0
                              : _RS4$Config.sellingPlansJson;
                          if (
                            null != jsonOfSellingPlans &&
                            jsonOfSellingPlans.length
                          ) {
                            var sellingPlanFrequency =
                                null == jsonOfSellingPlans
                                  ? void 0
                                  : jsonOfSellingPlans.find(function (e) {
                                      var n, t;
                                      return (
                                        (null == e
                                          ? void 0
                                          : null === (n = e.id) || void 0 === n
                                          ? void 0
                                          : null === (t = n.split('/')) ||
                                            void 0 === t
                                          ? void 0
                                          : t.pop()) == sellingPlan.id
                                      );
                                    }),
                              sellingPlanFrequencyText;
                            'MONTH' ===
                              (null == sellingPlanFrequency
                                ? void 0
                                : sellingPlanFrequency.frequencyInterval) &&
                              1 <
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.billingFrequencyCount) &&
                              (sellingPlanFrequencyText =
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.billingFrequencyCount) +
                                ' ' +
                                widgetLabels[
                                  'appstle.subscription.wg.monthsFrequencyTextV2'
                                ]),
                              'MONTH' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 ===
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  widgetLabels[
                                    'appstle.subscription.wg.monthlyLabelTextV2'
                                  ]),
                              'WEEK' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 <
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) +
                                  ' ' +
                                  widgetLabels[
                                    'appstle.subscription.wg.weeksFrequencyTextV2'
                                  ]),
                              'WEEK' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 ===
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  widgetLabels[
                                    'appstle.subscription.wg.weeklyLabelTextV2'
                                  ]),
                              'DAY' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 <
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) +
                                  ' ' +
                                  widgetLabels[
                                    'appstle.subscription.wg.daysFrequencyTextV2'
                                  ]),
                              'DAY' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 ===
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  widgetLabels[
                                    'appstle.subscription.wg.dayFrequencyTextV2'
                                  ]),
                              'YEAR' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 <
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) +
                                  ' ' +
                                  widgetLabels[
                                    'appstle.subscription.wg.yearsFrequencyTextV2'
                                  ]),
                              'YEAR' ===
                                (null == sellingPlanFrequency
                                  ? void 0
                                  : sellingPlanFrequency.frequencyInterval) &&
                                1 ===
                                  (null == sellingPlanFrequency
                                    ? void 0
                                    : sellingPlanFrequency.billingFrequencyCount) &&
                                (sellingPlanFrequencyText =
                                  widgetLabels[
                                    'appstle.subscription.wg.yearlyLabelTextV2'
                                  ]);
                          }
                          var sellingPlanDetails = {
                            name: sellingPlan.name,
                            description: sellingPlan.description,
                            sellingPlanId: sellingPlan.id,
                            formattedPrice: formattedPrice,
                            compareAtPrice: compareAtPrice,
                            formattedCompareAtPrice: formattedCompareAtPrice,
                            price: price,
                            totalPrice: totalPrice,
                            secondPrice: secondPrice,
                            secondFormattedPrice: secondFormattedPrice,
                            sellingPlanFrequencyText: sellingPlanFrequencyText,
                            discountText:
                              null != priceAdjustment && priceAdjustment.value
                                ? discountText
                                : null,
                            formattedDiscountText:
                              null != priceAdjustment && priceAdjustment.value
                                ? buildDiscountText(discountText)
                                : '',
                            showFormattedDiscountText: !(
                              null == priceAdjustment || !priceAdjustment.value
                            ),
                            isChecked: !(
                              1 != validSellingPlanCounter ||
                              !(
                                (null !== (_RSConfig8 = RSConfig) &&
                                  void 0 !== _RSConfig8 &&
                                  _RSConfig8.subscriptionOptionSelectedByDefault) ||
                                product.requires_selling_plan
                              )
                            ),
                            formattedPrepaidPerDeliveryPriceText:
                              buildPrepaidPerDeliveryPriceText(formattedPrice),
                          };
                          jQuery.extend(
                            sellingPlanDetails,
                            JSON.parse(
                              JSON.stringify(
                                getSellingPlanDetailsById(sellingPlan.id),
                              ),
                            ),
                          ),
                            (sellingPlanDetails.id = sellingPlan.id),
                            (sellingPlanDetails.isFrequencySubsequent =
                              1 < sellingPlanDetails.frequencyCount),
                            (sellingPlanDetails.frequencyIntervalLowerCase =
                              sellingPlanDetails.frequencyInterval.toLowerCase()),
                            null === sellingPlanDetails.discountText
                              ? ((sellingPlanDetails.secondFormattedDiscountText =
                                  ''),
                                (sellingPlanDetails.showSecondFormattedDiscountText =
                                  !1))
                              : ((sellingPlanDetails.secondFormattedDiscountText =
                                  discountText +
                                  ' '.concat(
                                    widgetLabels[
                                      'appstle.subscription.wg.offFrequencyTextV2'
                                    ] || 'off',
                                  )),
                                (sellingPlanDetails.showSecondFormattedDiscountText =
                                  !0)),
                            (sellingPlanDetails.prepaidFlag = eval(
                              sellingPlanDetails.prepaidFlag,
                            ));
                          var daysInBillingFrequency = 1,
                            totalDaysInBillingFrequency = 0,
                            sellingPlanFrequencyType = '';
                          'WEEK' === sellingPlanDetails.billingFrequencyInterval
                            ? ((daysInBillingFrequency = 7),
                              (sellingPlanFrequencyType =
                                widgetLabels[
                                  'appstle.subscription.wg.weeklyLabelTextV2'
                                ] || 'Weekly'))
                            : 'MONTH' ===
                              sellingPlanDetails.billingFrequencyInterval
                            ? ((daysInBillingFrequency = 30),
                              (sellingPlanFrequencyType =
                                widgetLabels[
                                  'appstle.subscription.wg.monthlyLabelTextV2'
                                ] || 'Monthly'))
                            : 'YEAR' ===
                                sellingPlanDetails.billingFrequencyInterval &&
                              ((daysInBillingFrequency = 365),
                              (sellingPlanFrequencyType =
                                widgetLabels[
                                  'appstle.subscription.wg.yearlyLabelTextV2'
                                ] || 'Yearly')),
                            sellingPlanDetails.prepaidFlag &&
                              (sellingPlanFrequencyType =
                                widgetLabels[
                                  'appstle.subscription.wg.prepayLabelTextV2'
                                ] || 'Prepay'),
                            (totalDaysInBillingFrequency =
                              sellingPlanDetails.billingFrequencyCount *
                              daysInBillingFrequency),
                            (sellingPlanDetails.pricePerDay =
                              formatPrice(
                                (sellingPlanDetails.price *
                                  sellingPlanDetails.billingFrequencyCount) /
                                  totalDaysInBillingFrequency,
                              ) +
                              '/'.concat(
                                widgetLabels[
                                  'appstle.subscription.wg.dayFrequencyTextV2'
                                ],
                              )),
                            (sellingPlanDetails.sellingPlanFrequencyType =
                              sellingPlanFrequencyType),
                            0 <
                            (sellingPlanDetails.price *
                              sellingPlanDetails.billingFrequencyCount) /
                              totalDaysInBillingFrequency
                              ? (sellingPlanDetails.showPricePerDay = !0)
                              : (sellingPlanDetails.showPricePerDay = !1),
                            sellingPlanVariants.push(sellingPlanDetails);
                        }
                      },
                    );
                },
              ),
              0 < sellingPlanVariants.length)
            ) {
              var _sellingPlanVariants, _RSConfig10, _RSConfig11, _RSConfig12;
              if (sellingPlanVariants.length < 2) {
                var _sellingPlanVariants$, _sellingPlanVariants$2;
                (Selling_Plan_Variants_Global.multipleSellingPlan = !1),
                  jQuery(purchaseOptions)
                    .find('.appstle_subscribe_option')
                    .children()
                    .hide();
                var singleSellingPlanDisplayText = buildSellingPlantText(
                  sellingPlanVariants[0],
                );
                Selling_Plan_Variants_Global.singleSellingPlanDisplayText =
                  singleSellingPlanDisplayText;
                var planText = jQuery(
                    '<div class="appstle_single_option_text">'.concat(
                      singleSellingPlanDisplayText,
                      '</div>',
                    ),
                  ),
                  _sellingPlanVariants$3,
                  _sellingPlanVariants$4,
                  _sellingPlanVariants$5,
                  _sellingPlanVariants$6,
                  _sellingPlanVariants$7;
                if (
                  (planText.appendTo(
                    purchaseOptions.find('.appstle_subscribe_option'),
                  ),
                  null !== (_sellingPlanVariants$ = sellingPlanVariants[0]) &&
                    void 0 !== _sellingPlanVariants$ &&
                    _sellingPlanVariants$.description &&
                    null !==
                      (_sellingPlanVariants$2 = sellingPlanVariants[0]) &&
                    void 0 !== _sellingPlanVariants$2 &&
                    _sellingPlanVariants$2.description.includes(
                      '{{sellingPlanName}}',
                    ))
                )
                  jQuery(
                    '<div class="appstleSellingPlanDescription">'.concat(
                      null ===
                        (_sellingPlanVariants$3 = sellingPlanVariants[0]) ||
                        void 0 === _sellingPlanVariants$3
                        ? void 0
                        : null ===
                            (_sellingPlanVariants$4 =
                              _sellingPlanVariants$3.description) ||
                          void 0 === _sellingPlanVariants$4
                        ? void 0
                        : _sellingPlanVariants$4.replace(
                            '{{sellingPlanName}}',
                            null ===
                              (_sellingPlanVariants$5 =
                                sellingPlanVariants[0]) ||
                              void 0 === _sellingPlanVariants$5
                              ? void 0
                              : _sellingPlanVariants$5.name,
                          ),
                      '</div>',
                    ),
                  ).appendTo(purchaseOptions.find('.appstle_subscribe_option'));
                else if (
                  null !== (_sellingPlanVariants$6 = sellingPlanVariants[0]) &&
                  void 0 !== _sellingPlanVariants$6 &&
                  _sellingPlanVariants$6.description
                )
                  jQuery(
                    '<div class="appstleSellingPlanDescription">'.concat(
                      null ===
                        (_sellingPlanVariants$7 = sellingPlanVariants[0]) ||
                        void 0 === _sellingPlanVariants$7
                        ? void 0
                        : _sellingPlanVariants$7.description,
                      '</div>',
                    ),
                  ).appendTo(purchaseOptions.find('.appstle_subscribe_option'));
              } else Selling_Plan_Variants_Global.multipleSellingPlan = !0;
              (sellingPlanVariants =
                null === (_sellingPlanVariants = sellingPlanVariants) ||
                void 0 === _sellingPlanVariants
                  ? void 0
                  : _sellingPlanVariants.map(function (n) {
                      var e,
                        t,
                        i =
                          null === (e = RSConfig) || void 0 === e
                            ? void 0
                            : null === (t = e.sellingPlansJson) || void 0 === t
                            ? void 0
                            : t.find(function (e) {
                                return e.idNew == n.idNew;
                              });
                      return (
                        (n.frequencySequence =
                          (null == i ? void 0 : i.frequencySequence) || 0),
                        n
                      );
                    })),
                sellingPlanVariants.sort(function (e, n) {
                  return e.frequencySequence - n.frequencySequence;
                }),
                (null !== (_RSConfig10 = RSConfig) &&
                  void 0 !== _RSConfig10 &&
                  _RSConfig10.sortByDefaultSequence) ||
                  sellingPlanVariants.sort(function (e, n) {
                    return e.price - n.price;
                  }),
                null !== (_RSConfig11 = RSConfig) &&
                  void 0 !== _RSConfig11 &&
                  _RSConfig11.showPrepaidPlansSeparately &&
                  !isPrepaidDropdown &&
                  (sellingPlanVariants = sellingPlanVariants.filter(function (
                    e,
                  ) {
                    return !(null != e && e.prepaidFlag);
                  })),
                null !== (_RSConfig12 = RSConfig) &&
                  void 0 !== _RSConfig12 &&
                  _RSConfig12.showPrepaidPlansSeparately &&
                  isPrepaidDropdown &&
                  (sellingPlanVariants = sellingPlanVariants.filter(function (
                    e,
                  ) {
                    return null == e ? void 0 : e.prepaidFlag;
                  })),
                jQuery(sellingPlanVariants).each(function (e, n) {
                  var t,
                    i = buildSellingPlantText(n);
                  (n.sellingPlanDisplayText = i),
                    null !== (t = RSConfig) &&
                    void 0 !== t &&
                    t.switchRadioButtonWidget
                      ? jQuery(
                          '<div class="appstle-radio-wrapper">\n                        <div class="appstle-radio-input-wrapper">\n                  <input type="radio" id="'
                            .concat(n.id, '" value="')
                            .concat(n.id, '" ')
                            .concat(
                              e ? '' : 'checked',
                              ' name="selling_plan_radio',
                            )
                            .concat(
                              isPrepaidDropdown ? '_prepaid' : '',
                              '" style="display: inline;"></input>\n                  <label for="',
                            )
                            .concat(n.id, '" ')
                            .concat(
                              sellingPlanVariants.length < 2
                                ? 'display: none;'
                                : '',
                              '">\n                    <span class="sellingplan">',
                            )
                            .concat(
                              i,
                              '</span>\n                  </label>\n                  </div>\n                  ',
                            )
                            .concat(
                              null != n &&
                                n.description &&
                                null != n &&
                                n.description.includes('{{sellingPlanName}}')
                                ? '<div class="appstleSellingPlanDescription">'.concat(
                                    null == n
                                      ? void 0
                                      : n.description.replace(
                                          '{{sellingPlanName}}',
                                          null == n ? void 0 : n.name,
                                        ),
                                    '</div>',
                                  )
                                : null != n && n.description
                                ? '<div class="appstleSellingPlanDescription">'.concat(
                                    null == n ? void 0 : n.description,
                                    '</div>',
                                  )
                                : '',
                              '\n                </div>',
                            ),
                        ).appendTo(
                          purchaseOptions.find(
                            '.appstleRadioSellingPlanWrapper',
                          ),
                        )
                      : jQuery('<option />', { value: n.id, html: i }).appendTo(
                          purchaseOptions.find('select'),
                        );
                }),
                (Selling_Plan_Variants_Global.sellingPlanVariants =
                  sellingPlanVariants);
            } else {
              Selling_Plan_Variants_Global.sellingPlanVariants = [];
              try {
                jQuery('#appstle_subscription_widget' + widgetId).remove();
                var timer = setTimeout(function () {
                  jQuery('#appstle_subscription_widget' + widgetId).remove(),
                    clearTimeout(timer);
                });
              } catch (e) {}
            }
            return sellingPlanVariants;
          }
          function hidePaymentButtons() {
            jQuery(RSConfig.selectors.payment_button_selectors).hide();
          }
          function showPaymentButtons() {
            jQuery(RSConfig.selectors.payment_button_selectors).show();
          }
          function deferJquery(e) {
            var n, t;
            (
              null !== (n = RS) &&
              void 0 !== n &&
              null !== (t = n.Config) &&
              void 0 !== t &&
              t.disableLoadingJquery
                ? window.jQuery
                : window.appstle_jQuery
            )
              ? e()
              : setTimeout(function () {
                  deferJquery(e);
                }, 50);
          }
          function hasPrepaidPlan(e) {
            var n,
              t = !1;
            return (
              null == e ||
                null === (n = e.selling_plan_allocations) ||
                void 0 === n ||
                n.forEach(function (e) {
                  (null == e ? void 0 : e.per_delivery_price) !==
                    (null == e ? void 0 : e.price) && (t = !0);
                }),
              t
            );
          }
          function hasOnlyPrepaid(e) {
            var n,
              t,
              i = 0;
            return (
              null == e ||
                null === (n = e.selling_plan_allocations) ||
                void 0 === n ||
                n.forEach(function (e) {
                  (null == e ? void 0 : e.per_delivery_price) !==
                    (null == e ? void 0 : e.price) && i++;
                }),
              (null == e
                ? void 0
                : null === (t = e.selling_plan_allocations) || void 0 === t
                ? void 0
                : t.length) === i && 0 < i
            );
          }
          function addSubscriptionItems(e, n) {
            var t, i, l, a, o, s, r, p;
            product.requires_selling_plan ||
              jQuery(
                '<div class="appstle_subscription_wrapper_option '
                  .concat(
                    product.requires_selling_plan ||
                      RS.Config.subscriptionOptionSelectedByDefault
                      ? ''
                      : 'appstle_selected_background',
                    '">\n              <div class="appstle_one_time_details_wrapper">\n              <input type="radio" ',
                  )
                  .concat(
                    RS.Config.subscriptionOptionSelectedByDefault
                      ? ''
                      : 'checked',
                    ' id="appstle_selling_plan_label_1',
                  )
                  .concat(widgetId, '" name="selling_plan" value="" ')
                  .concat(
                    RS.Config.formMappingAttributeName &&
                      RS.Config.formMappingAttributeSelector &&
                      jQuery(RS.Config.formMappingAttributeSelector).length &&
                      jQuery(RS.Config.formMappingAttributeSelector).attr('id')
                      ? ''
                          .concat(RS.Config.formMappingAttributeName, '=')
                          .concat(
                            jQuery(RS.Config.formMappingAttributeSelector).attr(
                              'id',
                            ),
                          )
                      : '',
                    ' tabindex="1">\n          <label for="appstle_selling_plan_label_1',
                  )
                  .concat(
                    widgetId,
                    '" class="appstle_radio_label" >\n            <span class="appstle_circle" ><span class="appstle_dot"></span></span>\n              <span class="appstle_one_time_text">',
                  )
                  .concat(
                    RS.Config.oneTimePurchaseText,
                    '</span>\n             </label>\n             <div class="appstle_one_time_price_wrapper">\n             <span class="appstle_subscription_amount transcy-money"></span>\n\n             <div class="appstle_one_time_unit_price">',
                  )
                  .concat(
                    null != n &&
                      n.unit_price &&
                      null != n &&
                      null !== (o = n.unit_price_measurement) &&
                      void 0 !== o &&
                      o.reference_unit
                      ? ''
                          .concat(
                            wrapPriceWithSpanTag(
                              formatPrice(null == n ? void 0 : n.unit_price),
                            ),
                            '/',
                          )
                          .concat(
                            1 <
                              (null == n
                                ? void 0
                                : null === (s = n.unit_price_measurement) ||
                                  void 0 === s
                                ? void 0
                                : s.reference_value)
                              ? null == n
                                ? void 0
                                : null === (r = n.unit_price_measurement) ||
                                  void 0 === r
                                ? void 0
                                : r.reference_value
                              : '',
                          )
                          .concat(
                            null == n
                              ? void 0
                              : null === (p = n.unit_price_measurement) ||
                                void 0 === p
                              ? void 0
                              : p.reference_unit,
                          )
                      : '',
                    '</div>\n\n             </div>\n          </div>\n          <div class="appstle_one_time_description_text">',
                  )
                  .concat(
                    widgetLabels[
                      'appstle.subscription.wg.onetimeDescriptionTextV2'
                    ] || '',
                    '</div>\n          ',
                  )
                  .concat('', '\n          </div>'),
              ).appendTo(e);
            var c,
              d = jQuery(
                '<div class="appstle_subscription_wrapper_option appstle_include_dropdown '
                  .concat(
                    product.requires_selling_plan ||
                      RS.Config.subscriptionOptionSelectedByDefault
                      ? 'appstle_selected_background'
                      : '',
                    ' payAsYouGoPlansDropdownWrapper">\n            <div class="appstle_subscription_radio_wrapper">\n            <input type="radio" id="appstle_selling_plan_label_2',
                  )
                  .concat(
                    widgetId,
                    '" name="selling_plan" value="Subscribe and save" ',
                  )
                  .concat(
                    product.requires_selling_plan ||
                      RS.Config.subscriptionOptionSelectedByDefault
                      ? 'checked'
                      : '',
                    ' ',
                  )
                  .concat(
                    RS.Config.formMappingAttributeName &&
                      RS.Config.formMappingAttributeSelector &&
                      jQuery(RS.Config.formMappingAttributeSelector).length &&
                      jQuery(RS.Config.formMappingAttributeSelector).attr('id')
                      ? ''
                          .concat(RS.Config.formMappingAttributeName, '=')
                          .concat(
                            jQuery(RS.Config.formMappingAttributeSelector).attr(
                              'id',
                            ),
                          )
                      : '',
                    ' tabindex="2">\n                <label for="appstle_selling_plan_label_2',
                  )
                  .concat(
                    widgetId,
                    '" class="appstle_radio_label" >\n                    <span class="appstle_circle" ><span class="appstle_dot"></span></span>\n                    <span class="appstle_subscribe_save_text">',
                  )
                  .concat(
                    RS.Config.subscriptionOptionText,
                    '</span>\n                </label>\n                <div class="appstle_subscription_amount_wrapper">\n                  <span class="appstle_subscription_amount transcy-money"></span>\n                  <span class="appstle_subscription_compare_amount transcy-money"></span>\n                </div>\n            </div>\n            <div class="appstle_subscribe_option ',
                  )
                  .concat(
                    product.requires_selling_plan ||
                      RS.Config.subscriptionOptionSelectedByDefault
                      ? ''
                      : 'appstle_hide_subsOption',
                    '">\n            <div class="appstle_subscribe_option_grid">\n                ',
                  )
                  .concat(
                    RS.Config.sellingPlanSelectTitle
                      ? '<label for="appstle_selling_plan'
                          .concat(widgetId, '" class="appstle_select_label">')
                          .concat(RS.Config.sellingPlanSelectTitle, '</label>')
                      : '',
                    '\n                ',
                  )
                  .concat(
                    null !== (t = RSConfig) &&
                      void 0 !== t &&
                      t.switchRadioButtonWidget
                      ? '<div class="appstleRadioSellingPlanWrapper"></div>'
                      : ' <select id="appstle_selling_plan'.concat(
                          widgetId,
                          '" class="appstle_select">\n                </select><div class="appstleSelectedSellingPlanOptionDescription"></div>',
                        ),
                    '\n                ',
                  )
                  .concat(
                    '',
                    '\n            </div>\n            <div>\n        </div>',
                  ),
              ),
              u = jQuery(
                '<div class="appstle_subscription_wrapper_option appstle_include_dropdown '
                  .concat(
                    hasOnlyPrepaid(n) &&
                      (product.requires_selling_plan ||
                        RS.Config.subscriptionOptionSelectedByDefault)
                      ? 'appstle_selected_background'
                      : '',
                    ' prepaidPlansDropdownWrapper">\n            <div class="appstle_subscription_radio_wrapper">\n            <input type="radio" id="appstle_selling_plan_label_3',
                  )
                  .concat(widgetId, '" name="selling_plan" value="Prepaid" ')
                  .concat(
                    hasOnlyPrepaid(n) &&
                      (product.requires_selling_plan ||
                        RS.Config.subscriptionOptionSelectedByDefault)
                      ? 'checked'
                      : '',
                    ' ',
                  )
                  .concat(
                    RS.Config.formMappingAttributeName &&
                      RS.Config.formMappingAttributeSelector &&
                      jQuery(RS.Config.formMappingAttributeSelector).length &&
                      jQuery(RS.Config.formMappingAttributeSelector).attr('id')
                      ? ''
                          .concat(RS.Config.formMappingAttributeName, '=')
                          .concat(
                            jQuery(RS.Config.formMappingAttributeSelector).attr(
                              'id',
                            ),
                          )
                      : '',
                    ' tabindex="3">\n                <label for="appstle_selling_plan_label_3',
                  )
                  .concat(
                    widgetId,
                    '" class="appstle_radio_label" >\n                    <span class="appstle_circle" ><span class="appstle_dot"></span></span>\n                    <span class="appstle_subscribe_save_text">',
                  )
                  .concat(
                    (null === (i = RS) || void 0 === i
                      ? void 0
                      : null === (l = i.Config) || void 0 === l
                      ? void 0
                      : l.prepaidOptionText) || 'Prepaid',
                    '</span>\n                </label>\n                <div class="appstle_subscription_amount_wrapper">\n                  <span class="appstle_subscription_amount transcy-money"></span>\n                  <span class="appstle_subscription_compare_amount transcy-money"></span>\n                </div>\n            </div>\n            <div class="appstle_subscribe_option ',
                  )
                  .concat(
                    hasOnlyPrepaid(n)
                      ? product.requires_selling_plan ||
                        RS.Config.subscriptionOptionSelectedByDefault
                        ? ''
                        : 'appstle_hide_subsOption'
                      : '',
                    '">\n            <div class="appstle_subscribe_option_grid">\n                ',
                  )
                  .concat(
                    RS.Config.sellingPlanSelectTitle
                      ? '<label for="appstle_selling_plan'
                          .concat(widgetId, '" class="appstle_select_label">')
                          .concat(RS.Config.sellingPlanSelectTitle, '</label>')
                      : '',
                    '\n                ',
                  )
                  .concat(
                    null !== (a = RSConfig) &&
                      void 0 !== a &&
                      a.switchRadioButtonWidget
                      ? '<div class="appstleRadioSellingPlanWrapper"></div>'
                      : ' <select id="appstle_selling_plan'.concat(
                          widgetId,
                          '" class="appstle_select">\n                </select><div class="appstleSelectedSellingPlanOptionDescription"></div>',
                        ),
                    '\n                ',
                  )
                  .concat(
                    '',
                    '\n            </div>\n            </div>\n        </div>',
                  ),
              ),
              g = populateDropdown(d, n);
            g &&
              0 < g.length &&
              (null !== (c = RSConfig) &&
              void 0 !== c &&
              c.showSubOptionBeforeOneTime
                ? d.prependTo(e)
                : d.appendTo(e));
            if (RSConfig.showPrepaidPlansSeparately && hasPrepaidPlan(n)) {
              var f;
              if (
                (populateDropdown(u, n, RSConfig.showPrepaidPlansSeparately),
                hasOnlyPrepaid(n))
              )
                null !== (f = RSConfig) &&
                void 0 !== f &&
                f.showSubOptionBeforeOneTime
                  ? u.prependTo(e)
                  : u.appendTo(e);
              else u.insertAfter(d);
            }
            addStyle(widgetId);
          }
          function changeEventHandlerForRadio() {
            jQuery('#appstle_subscription_widget' + widgetId)
              .find('.appstle_subscription_wrapper input[type=radio]')
              .on('change', function (e) {
                var n = jQuery(e.target)
                    .parents('.appstle_include_dropdown')
                    .find('.appstle_subscribe_option'),
                  t = jQuery(
                    '#appstle_subscription_widget' +
                      widgetId +
                      ' .appstleLoyaltyTable',
                  ),
                  i = jQuery(e.target).parents(
                    '.appstle_subscription_wrapper_option',
                  );
                0 < n.length
                  ? checkIfSellingPlanGroupIsSelected(i)
                    ? (jQuery('.appstle_subscribe_option').addClass(
                        'appstle_hide_subsOption',
                      ),
                      n.removeClass('appstle_hide_subsOption'),
                      jQuery(
                        '#appstle_subscription_widget' +
                          widgetId +
                          ' .appstle_subscription_wrapper_option.appstle_include_dropdown',
                      ).addClass('appstle_selected_background'),
                      jQuery(
                        '#appstle_subscription_widget' +
                          widgetId +
                          ' .appstle_subscription_wrapper_option:not(.appstle_include_dropdown)',
                      ).removeClass('appstle_selected_background'),
                      t.show(),
                      dispatchAppstleEvent('SellingPlanSelected'))
                    : (jQuery(
                        '#appstle_subscription_widget' +
                          widgetId +
                          ' .appstle_subscription_wrapper_option.appstle_include_dropdown',
                      ).removeClass('appstle_selected_background'),
                      jQuery(
                        '#appstle_subscription_widget' +
                          widgetId +
                          ' .appstle_subscription_wrapper_option:not(.appstle_include_dropdown)',
                      )
                        .first()
                        .addClass('appstle_selected_background'),
                      n.addClass('appstle_hide_subsOption'),
                      t.hide(),
                      dispatchAppstleEvent('SellingPlanRemoved'))
                  : jQuery('.appstle_subscribe_option').addClass(
                      'appstle_hide_subsOption',
                    ),
                  jQuery(e.target).is(':checked') &&
                    (jQuery('.appstle_subscription_wrapper_option').removeClass(
                      'appstle-active-option',
                    ),
                    jQuery(e.target)
                      .parents('.appstle_subscription_wrapper_option')
                      .addClass('appstle-active-option')),
                  updateStateOfWidget(e),
                  (window.appstleSelectedSellingPlan = e.target.value);
              });
          }
          function updateFormFields(n) {
            if (
              (jQuery('.appstle_fields_wrapper' + widgetId).remove(),
              jQuery(RSConfig.atcButtonSelector)
                .parents('form')
                .removeAttr('novalidate'),
              n)
            ) {
              var e = RSConfig.sellingPlansJson;
              if (e) {
                var l = jQuery(
                    '<div class="appstle_fields_wrapper appstle_fields_wrapper'.concat(
                      widgetId,
                      '"></div>',
                    ),
                  ),
                  t =
                    null == e
                      ? void 0
                      : e.find(function (e) {
                          return e.id == 'gid://shopify/SellingPlan/'.concat(n);
                        });
                if (!t) return;
                var i = JSON.parse(
                  (null == t ? void 0 : t.formFieldJson) || null,
                );
                i &&
                  0 < i.length &&
                  (l.insertBefore(
                    '#appstle_subscription_widget' +
                      widgetId +
                      ' .appstle_widget_title',
                  ),
                  i.forEach(function (e, n) {
                    if ('date' === e.type)
                      l.append(
                        jQuery(
                          '\n                    <div class="appstleOrderDatePicker" '
                            .concat(
                              e.visible ? '' : 'style="display: none;"',
                              '>\n                      <label class="appstleFormFieldLabel appstleOrderDatePickerLabel" for="properties[_order-date]">',
                            )
                            .concat(
                              e.label,
                              '</label>\n                      <div class="as-date-input-wrapper">\n                        <input class="appstle_form_field_input" type="text">\n                        <input class="appstle_form_field_input_alternate" type="hidden">\n                        <input name="properties[_order-date]" value="" class="appstle_form_field_input_iso" type="hidden">\n                      </div>\n                    </div>',
                            ),
                        ),
                      ),
                        getJqueryUIFromCDN(),
                        attatchDatePicker(
                          e.config,
                          e.enabledDays,
                          e.nextOrderMinimumThreshold,
                        );
                    else if ('text' === e.type)
                      l.append(
                        jQuery(
                          '\n                    <div class="appstleCustomTextField" '
                            .concat(
                              e.visible ? '' : 'style="display: none;"',
                              '>\n                      <label class="appstleFormFieldLabel appstleCustomTextFieldLabel" for="properties[',
                            )
                            .concat(e.name, ']">')
                            .concat(
                              e.label,
                              '</label>\n                      <div class="as-customTextField-wrapper">\n                        <input name="properties[',
                            )
                            .concat(e.name, ']" ')
                            .concat(
                              null != e && e.required ? 'required' : '',
                              ' value="" type="text" class="appstle_form_field_text_input">\n                      </div>\n                    </div>',
                            ),
                        ),
                      );
                    else if ('select' === e.type) {
                      var t,
                        i =
                          (null == e
                            ? void 0
                            : null === (t = e.selectOptions) || void 0 === t
                            ? void 0
                            : t.split(',')) || [];
                      l.append(
                        jQuery(
                          '\n                    <div class="appstleCustomSelectField" '
                            .concat(
                              e.visible ? '' : 'style="display: none;"',
                              '>\n                      <label class="appstleFormFieldLabel appstleCustomSelectFieldLabel" for="properties[',
                            )
                            .concat(e.name, ']">')
                            .concat(
                              e.label,
                              '</label>\n                      <div class="as-customTextField-wrapper">\n                        <select name="properties[',
                            )
                            .concat(e.name, ']" ')
                            .concat(
                              null != e && e.required ? 'required' : '',
                              ' value="" type="select" class="appstle_form_field_text_input">\n                          ',
                            )
                            .concat(
                              null == i
                                ? void 0
                                : i
                                    .map(function (e) {
                                      return '<option value="'
                                        .concat(e, '">')
                                        .concat(e, '</option>');
                                    })
                                    .join(''),
                              '\n                        </select>\n                      </div>\n                    </div>',
                            ),
                        ),
                      );
                    }
                  }),
                  jQuery(
                    '#appstle_subscription_widget' +
                      widgetId +
                      ' .appstle_form_field_input_alternate',
                  ).on('change', function (e) {
                    if (e.target.value) {
                      var n =
                        e.target.value +
                        'T' +
                        new Date().toISOString().split('T')[1];
                      jQuery('.appstle_form_field_input_iso').attr(
                        'value',
                        new Date(n).toISOString().split('.')[0] + 'Z',
                      ),
                        jQuery('.appstle_form_field_input_iso').val(
                          new Date(n).toISOString().split('.')[0] + 'Z',
                        );
                    }
                  }),
                  jQuery(
                    '#appstle_subscription_widget' +
                      widgetId +
                      ' .appstle_form_field_input',
                  )
                    .parents('.as-date-input-wrapper')
                    .find('input')
                    .each(function (e, n) {
                      $(n).trigger('change');
                    }));
              }
            }
          }
          function getJqueryUIFromCDN() {
            var e;
            if (
              (window.jQuery ||
                ((window.jQuery = window.appstle_jQuery),
                (window.$ = window.appstle_jQuery)),
              !jQuery('.jqueryUIFetched').length) &&
              void 0 ===
                (null === (e = window.jQuery) || void 0 === e
                  ? void 0
                  : e.datepicker)
            ) {
              var n = document.createElement('script');
              (n.src = 'https://code.jquery.com/ui/1.13.2/jquery-ui.min.js'),
                (n.type = 'text/javascript'),
                head.appendChild(n);
              var t = document.createElement('link');
              (t.href =
                'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css'),
                (t.rel = 'stylesheet'),
                head.appendChild(t),
                jQuery('html').addClass('jqueryUIFetched');
            }
          }
          function getJqueryi18() {
            if ('Object' == getClassOf(jQuery.ui)) {
              if ('Function' == getClassOf(jQuery.ui.tabs)) {
                var e = document.createElement('script');
                (e.src =
                  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/i18n/jquery-ui-i18n.min.js'),
                  (e.type = 'text/javascript'),
                  head.appendChild(e);
              }
            } else setTimeout(getJqueryi18, 30);
          }
          function attatchDatePicker(e, l, n) {
            var t,
              a = new Date(),
              o = !1,
              i = [];
            n = n && parseInt(n) ? parseInt(n) : 0;
            for (var s = 0; s <= 7; s++) {
              var r = new Date();
              r.setDate(new Date().getDate() + s + n), i.push(r);
            }
            if (
              (i.forEach(function (e) {
                !(function (e) {
                  var n;
                  if (l && null !== (n = l) && void 0 !== n && n.length) {
                    var t,
                      i = new Date(e);
                    'string' == typeof l && (l = JSON.parse(l)),
                      -1 !==
                        (null === (t = l) || void 0 === t
                          ? void 0
                          : t.map(function (e) {
                              return parseInt(null == e ? void 0 : e.value);
                            })
                        ).indexOf(i.getDay()) &&
                        (o || ((a = new Date(e)), (o = !0)));
                  } else o || ((a = new Date(e)), (o = !0));
                })(e);
              }),
              null !== (t = window.jQuery) && void 0 !== t && t.datepicker)
            ) {
              if (
                jQuery(
                  '#appstle_subscription_widget' +
                    widgetId +
                    ' .appstle_form_field_input_iso',
                ).length
              ) {
                var p = {
                  altField:
                    '#appstle_subscription_widget' +
                    widgetId +
                    ' .appstle_form_field_input_alternate',
                  altFormat: 'yy-mm-dd',
                  autoSize: !0,
                  minDate: a,
                  showOn: 'both',
                  buttonImage:
                    'https://ik.imagekit.io/mdclzmx6brh/calendar_month_FILL0_wght400_GRAD0_opsz48_iJLonfrRJ.png',
                  defaultDate: a,
                  currentText: 'Now',
                  beforeShowDay: function (e) {
                    var n;
                    if (l && null !== (n = l) && void 0 !== n && n.length) {
                      var t,
                        i = new Date(e);
                      return (
                        'string' == typeof l && (l = JSON.parse(l)),
                        -1 !==
                        (null === (t = l) || void 0 === t
                          ? void 0
                          : t.map(function (e) {
                              return parseInt(null == e ? void 0 : e.value);
                            })
                        ).indexOf(i.getDay())
                          ? [!0]
                          : [!1]
                      );
                    }
                    return [!0];
                  },
                  onSelect: function () {
                    $(this)
                      .parents('.as-date-input-wrapper')
                      .find('input')
                      .trigger('change');
                  },
                };
                e = e ? JSON.parse(e) : {};
                var c = jQuery.extend({}, p, e);
                window
                  .jQuery(
                    '#appstle_subscription_widget' +
                      widgetId +
                      ' .appstle_form_field_input',
                  )
                  .datepicker(c),
                  window
                    .jQuery(
                      '#appstle_subscription_widget' +
                        widgetId +
                        ' .appstle_form_field_input',
                    )
                    .datepicker('setDate', a),
                  window
                    .jQuery(
                      '#appstle_subscription_widget' +
                        widgetId +
                        ' .appstle_form_field_input',
                    )
                    .parents('.as-date-input-wrapper')
                    .find('input')
                    .trigger('change');
              }
            } else
              setTimeout(function () {
                return attatchDatePicker(e, l, n);
              }, 30);
          }
          function changeHandlerForSelect() {
            var e;
            null !== (e = RSConfig) && void 0 !== e && e.switchRadioButtonWidget
              ? jQuery(
                  '#appstle_subscription_widget' +
                    widgetId +
                    ' .appstle_subscribe_option input',
                ).on('change', function (e) {
                  updateStateOfWidget(e),
                    updateFormFields(getCurrentSellingPlanId());
                })
              : jQuery(
                  '#appstle_subscription_widget' +
                    widgetId +
                    ' .appstle_subscription_wrapper select',
                ).on('change', function (e) {
                  updateStateOfWidget(e),
                    updateFormFields(getCurrentSellingPlanId());
                }),
              jQuery(
                '#appstle_subscription_widget' +
                  widgetId +
                  ' input[name="selling_plan"]',
              ).on('change', function (e) {
                updateStateOfWidget(e),
                  updateFormFields(getCurrentSellingPlanId());
              }),
              updateFormFields(getCurrentSellingPlanId());
          }
          function triggerChangeEvent(e) {
            jQuery(e).change();
          }
          function registerAndTriggerEventsForFormFields() {
            changeEventHandlerForRadio(),
              changeHandlerForSelect(),
              triggerEventsFromInput();
          }
          function triggerEventsFromInput() {
            jQuery(
              '#appstle_subscription_widget' +
                widgetId +
                ' .appstle_subscribe_option select',
            ).trigger('change'),
              jQuery(
                '#appstle_subscription_widget' +
                  widgetId +
                  ' .appstle_subscribe_option input',
              ).trigger('change'),
              jQuery(
                '#appstle_subscription_widget' +
                  widgetId +
                  ' input[name=selling_plan]',
              ).trigger('change');
          }
          function unbindEventListeners() {
            jQuery(
              '.appstle_subscription_wrapper input[type=radio], .appstle_subscription_wrapper select',
            ).off('change');
          }
          function getSelectedSellingPlanPrice() {
            var e = getSelectedSellingPlanId();
            return e
              ? formatPriceWithQuantity(
                  getSellingPlanAllocation(localWindowVariant.id, parseInt(e))
                    .per_delivery_price,
                )
              : null;
          }
          function getCurrentQuantity() {
            var e,
              n,
              t = jQuery(buildAtcButtonSelector()).first();
            return (
              standAloneElement && (t = standAloneElement),
              Array.prototype.slice
                .call(
                  t
                    .parents(
                      null === (e = RSConfig) || void 0 === e
                        ? void 0
                        : e.widgetParentSelector,
                    )
                    .find(
                      null === (n = RSConfig) || void 0 === n
                        ? void 0
                        : n.quantitySelector,
                    ),
                )
                .map(function (e) {
                  return Number($(e).val());
                })
                .reduce(function (e, n) {
                  return Math.max(e, n);
                }, -1 / 0)
            );
          }
          function getCurrentQuantityPrice(e) {
            var n;
            return (
              e *
              (('true' ===
                (null === (n = RSConfig) || void 0 === n
                  ? void 0
                  : n.updatePriceOnQuantityChange) &&
                parseInt(getCurrentQuantity())) ||
                1)
            );
          }
          function formatPriceWithQuantity(e) {
            return formatPrice(getCurrentQuantityPrice(e));
          }
          function getSelectedSellingPlanId() {
            var e = null;
            try {
              var n;
              null !== (n = RSConfig) &&
              void 0 !== n &&
              n.switchRadioButtonWidget
                ? (e = jQuery('#appstle_subscription_widget' + widgetId)
                    .find('.appstle_subscribe_option input:checked')
                    .val()) ||
                  (e = jQuery('#appstle_subscription_widget' + widgetId)
                    .find('input[name="selling_plan"]:checked')
                    .val())
                : (e = jQuery('#appstle_subscription_widget' + widgetId)
                    .find(
                      '.appstle_subscription_wrapper_option.appstle_include_dropdown.appstle-active-option select',
                    )
                    .val());
            } catch (e) {}
            return e;
          }
          function getCurrentSellingPlanId() {
            var e = null;
            try {
              e = jQuery('#appstle_subscription_widget' + widgetId)
                .find('input[name=selling_plan]:checked')
                .val();
            } catch (e) {}
            return e;
          }
          function getVariantId() {
            var e,
              n,
              t,
              i,
              l = urlParam('variant');
            return l &&
              null !== (e = RSConfig) &&
              void 0 !== e &&
              e.detectVariantFromURLParams
              ? l
              : standAloneElement
              ? (null ==
                jQuery(standAloneElement)
                  .closest('form[action$="/cart/add"]')
                  .find('[name=id]')[0]
                  ? localWindowVariant.id
                  : jQuery(standAloneElement)
                      .closest('form[action$="/cart/add"]')
                      .find('[name=id]')[0].value) ||
                (null ===
                  (n = jQuery(standAloneElement)
                    .parents('html')
                    .find('form[action$="/cart/add"]')
                    .find('[name=id]')[0]) || void 0 === n
                  ? void 0
                  : n.value)
              : (null ==
                jQuery('#appstle_subscription_widget' + widgetId)
                  .closest('form[action$="/cart/add"]')
                  .find('[name=id]')[0]
                  ? localWindowVariant.id
                  : jQuery('#appstle_subscription_widget' + widgetId)
                      .closest('form[action$="/cart/add"]')
                      .find('[name=id]')[0].value) ||
                jQuery('#appstle_subscription_widget' + widgetId)
                  .closest(
                    null === (t = RSConfig) || void 0 === t
                      ? void 0
                      : t.widgetParentSelector,
                  )
                  .find('[name=id]')
                  .val() ||
                (null ===
                  (i = jQuery('#appstle_subscription_widget' + widgetId)
                    .parents('html')
                    .find('form[action$="/cart/add"]')
                    .find('[name=id]')[0]) || void 0 === i
                  ? void 0
                  : i.value);
          }
          function updateOneTimePurchaseValueToRadio() {
            var e,
              n,
              t = getVariantId(),
              i = null;
            standAloneElement
              ? (i = (
                  null == standAloneProduct
                    ? void 0
                    : standAloneProduct.variants.filter(function (e) {
                        return String(null == e ? void 0 : e.id) === String(t);
                      })
                ).pop().price)
              : (i =
                  null === (e = RSConfig) || void 0 === e
                    ? void 0
                    : null === (n = e.variantsById[t]) || void 0 === n
                    ? void 0
                    : n.price);
            jQuery(
              '#appstle_subscription_widget' +
                widgetId +
                ' .appstle_subscription_wrapper_option:not(.appstle_include_dropdown) .appstle_subscription_amount',
            ).html(
              wrapPriceWithSpanTag(
                buildOneTimePriceText(formatPriceWithQuantity(i)),
              ),
            );
          }
          function appendSellingPlanDescription(e, n) {
            jQuery(
              '#appstle_subscription_widget' +
                widgetId +
                ' .appstleSellingPlanDescription',
            ).length ||
              (e &&
                0 ===
                  n.find('.appstleSelectedSellingPlanOptionDescription')
                    .length &&
                checkIfSellingPlanGroupIsSelected() &&
                (jQuery(
                  '#appstle_subscription_widget'.concat(
                    widgetId,
                    ' .widgetSellingPlanWrapper',
                  ),
                ).length
                  ? $(
                      "<div class='appstleSelectedSellingPlanOptionDescription'>".concat(
                        e,
                        '</div>',
                      ),
                    ).insertAfter(
                      '#appstle_subscription_widget'.concat(
                        widgetId,
                        ' .widgetSellingPlanWrapper',
                      ),
                    )
                  : n
                      .find('.appstle_subscribe_option_grid')
                      .append(
                        "<div class='appstleSelectedSellingPlanOptionDescription'>".concat(
                          e,
                          '</div>',
                        ),
                      )));
          }
          function getVariantUnitPriceUnit(e) {
            var n,
              t,
              i,
              l = localVariantsById[e];
            return ''
              .concat(
                1 <
                  (null == l
                    ? void 0
                    : null === (n = l.unit_price_measurement) || void 0 === n
                    ? void 0
                    : n.reference_value)
                  ? ''.concat(
                      null == l
                        ? void 0
                        : null === (t = l.unit_price_measurement) ||
                          void 0 === t
                        ? void 0
                        : t.reference_value,
                    )
                  : '',
              )
              .concat(
                null == l
                  ? void 0
                  : null === (i = l.unit_price_measurement) || void 0 === i
                  ? void 0
                  : i.reference_unit,
              );
          }
          function getSelectedFrequencyName(n) {
            var e,
              t,
              i,
              l =
                null === (e = RSConfig) || void 0 === e
                  ? void 0
                  : null === (t = e.sellingPlansJson) || void 0 === t
                  ? void 0
                  : t
                      .filter(function (e) {
                        return e.id.includes(n);
                      })
                      .pop(),
              a = '';
            return (
              1 < (null == l ? void 0 : l.billingFrequencyCount) &&
                (a = (null == l ? void 0 : l.billingFrequencyCount) + ' '),
              (i = getIntervalName(
                null == l ? void 0 : l.billingFrequencyInterval,
                null == l ? void 0 : l.billingFrequencyCount,
              )),
              ''.concat(a).concat(i)
            );
          }
          function getIntervalName(e, n) {
            var t = '';
            return (
              'MONTH' === e &&
                1 < n &&
                (t =
                  widgetLabels[
                    'appstle.subscription.wg.monthsFrequencyTextV2'
                  ]),
              'MONTH' === e &&
                1 === n &&
                (t =
                  widgetLabels['appstle.subscription.wg.monthFrequencyTextV2']),
              'WEEK' === e &&
                1 < n &&
                (t =
                  widgetLabels['appstle.subscription.wg.weeksFrequencyTextV2']),
              'WEEK' === e &&
                1 === n &&
                (t =
                  widgetLabels['appstle.subscription.wg.weekFrequencyTextV2']),
              'DAY' === e &&
                1 < n &&
                (t =
                  widgetLabels['appstle.subscription.wg.daysFrequencyTextV2']),
              'DAY' === e &&
                1 === n &&
                (t =
                  widgetLabels['appstle.subscription.wg.dayFrequencyTextV2']),
              'YEAR' === e &&
                1 < n &&
                (t =
                  widgetLabels['appstle.subscription.wg.yearsFrequencyTextV2']),
              'YEAR' === e &&
                1 === n &&
                (t =
                  widgetLabels['appstle.subscription.wg.yearFrequencyTextV2']),
              t
            );
          }
          function updateSelectValueToRadio(e) {
            var n = e.target.value || '';
            if (
              parseInt(n) &&
              (!jQuery(e.target).is('input') || jQuery(e.target).is(':checked'))
            ) {
              n = e.target.value || '';
              var t = jQuery(e.target).parents(
                '.appstle_subscription_wrapper_option',
              );
              if (
                (t
                  .find('.appstleSelectedSellingPlanOptionDescription')
                  .remove(),
                jQuery('#appstle_subscription_widget'.concat(widgetId))
                  .find('[name="properties[_fulfillments-count]"]')
                  .remove(),
                n)
              ) {
                var i = getVariantId();
                getLoyaltyProductData(n, checkIfSellingPlanGroupIsSelected());
                var l = getSellingPlanAllocation(i, parseInt(n)),
                  a = formatPriceWithQuantity(l.per_delivery_price),
                  o = l.per_delivery_price !== l.price,
                  s = '';
                !o &&
                  localVariantsById[i].price &&
                  (s = wrapPriceWithSpanTag(
                    formatPriceWithQuantity(localVariantsById[i].price),
                  ));
                var r = getSellingPlanDetails(
                    null == l ? void 0 : l.selling_plan_group_id,
                    null == l ? void 0 : l.selling_plan_id,
                  ),
                  p = (null == r ? void 0 : r.description) || '';
                t.find('input[name=selling_plan]').attr('value', n);
                var c = wrapPriceWithSpanTag(
                    buildSelectedPriceText(
                      a,
                      o,
                      formatPriceWithQuantity(l.price),
                    ),
                  ),
                  d = getSellingPlanDiscountPercentage(),
                  u = getSellingPlanDiscountPercentage(!0),
                  g = buildTooltipDetailsText(
                    buildSelectedTooltipPrePaidText(
                      a,
                      formatPriceWithQuantity(l.price),
                    ),
                    o,
                    buildSelectedTooltipDiscountText(l, u),
                  ),
                  f = buildSubscriptionOptionText(
                    o,
                    d,
                    getSelectedFrequencyName(n),
                    a,
                  ),
                  _ = buildPrepaidPerDeliveryPriceText(a);
                t.find('.appstle_prepaid_description').remove(),
                  t.find('.appstle_selling_plan_unit_price').remove(),
                  t.find('.appstle_subscription_amount').html(c),
                  localVariantsById[i].price !== l.price
                    ? t.find('.appstle_subscription_compare_amount ').html(s)
                    : t.find('.appstle_subscription_compare_amount ').html(''),
                  null != l &&
                    l.unit_price &&
                    t
                      .find('.appstle_subscription_amount_wrapper')
                      .append(
                        '<div class="appstle_selling_plan_unit_price transcy-money">'
                          .concat(
                            wrapPriceWithSpanTag(
                              formatPrice(null == l ? void 0 : l.unit_price),
                            ),
                            '/',
                          )
                          .concat(getVariantUnitPriceUnit(i), '</div>'),
                      ),
                  o &&
                    _ &&
                    t
                      .find('.appstle_subscription_amount_wrapper')
                      .append(
                        '<div class="appstle_prepaid_description transcy-money">'.concat(
                          wrapPriceWithSpanTag(_) ||
                            wrapPriceWithSpanTag(
                              formatPriceWithQuantity(l.price),
                            ) + '/delivery',
                          '</div>',
                        ),
                      ),
                  !o &&
                    t.hasClass('payAsYouGoPlansDropdownWrapper') &&
                    t.find('.appstle_subscribe_save_text').html(f),
                  checkIfSellingPlanGroupIsSelected() && g && g.trim()
                    ? RS.Config.showStaticTooltip
                      ? jQuery(
                          '#appstle_subscription_widget' +
                            widgetId +
                            ' .appstle_tooltip_wrapper_static',
                        ).html(g)
                      : jQuery(
                          '#appstle_subscription_widget' +
                            widgetId +
                            ' .appstle_tooltip_wrapper .appstle_tooltip .appstle_tooltip_content',
                        ).html(g)
                    : (t
                        .find('.appstleSelectedSellingPlanOptionDescription')
                        .remove(),
                      RS.Config.showStaticTooltip &&
                      RS.Config.tooltipDesctiption &&
                      RS.Config.tooltipDesctiption.trim()
                        ? jQuery(
                            '#appstle_subscription_widget' +
                              widgetId +
                              ' .appstle_tooltip_wrapper_static',
                          ).html(RS.Config.tooltipDesctiption)
                        : jQuery(
                            '#appstle_subscription_widget' +
                              widgetId +
                              ' .appstle_tooltip_wrapper .appstle_tooltip .appstle_tooltip_content',
                          ).html(RS.Config.tooltipDesctiption));
                var v = p.includes('{{sellingPlanName}}')
                  ? p.replace(
                      '{{sellingPlanName}}',
                      null == r ? void 0 : r.name,
                    )
                  : p;
                if (
                  (p && appendSellingPlanDescription(p, t),
                  t
                    .find('.appstleSelectedSellingPlanOptionDescription')
                    .html(v),
                  t.find('[name="selling_plan"]:checked').val() &&
                    'true' ===
                      widgetLabels[
                        'appstle.subscription.wg.allowFulfilmentCountViaPropertiesV2'
                      ])
                ) {
                  var y =
                    r.options[0].value.match(/(\d+)/g)[1] /
                    r.options[0].value.match(/(\d+)/g)[0];
                  jQuery(
                    '#appstle_subscription_widget'.concat(widgetId),
                  ).append(
                    '<input type=hidden name="properties[_fulfillments-count]" value="'.concat(
                      y,
                      '">',
                    ),
                  );
                }
              }
            }
          }
          function getLoyaltyProductData(n, e) {
            var t,
              i,
              l,
              a,
              o =
                null === (t = RSConfig) || void 0 === t
                  ? void 0
                  : null === (i = t.sellingPlansJson) || void 0 === i
                  ? void 0
                  : i.find(function (e) {
                      return (
                        (null == e ? void 0 : e.id.split('/').pop()) ===
                        String(n)
                      );
                    }),
              s = [];
            null != o &&
              null !== (l = o.appstleCycles) &&
              void 0 !== l &&
              l.length &&
              (null == o ||
                null === (a = o.appstleCycles) ||
                void 0 === a ||
                a.forEach(function (e) {
                  s.push(null == e ? void 0 : e.freeProductHandle);
                }));
            getAllProductData(s, n, e);
          }
          function getAllProductData(n, t, i) {
            var e,
              l,
              a = n.shift();
            a
              ? null !== (e = window) &&
                void 0 !== e &&
                null !== (l = e.products) &&
                void 0 !== l &&
                l[a]
                ? n.length
                  ? getAllProductData(n, t, i)
                  : createLoyaltyTableData(t, i)
                : fetch('/products/'.concat(a, '.js'))
                    .then(function (e) {
                      if (e.ok) return e.json();
                    })
                    .then(function (e) {
                      window.products || (window.products = {}),
                        (window.products[a] = e),
                        n.length
                          ? getAllProductData(n, t, i)
                          : createLoyaltyTableData(t, i);
                    })
              : n.length
              ? getAllProductData(n, t, i)
              : createLoyaltyTableData(t, i);
          }
          function createLoyaltyTableData(n, e) {
            var t,
              i,
              l,
              a,
              w = [];
            (e = checkIfSellingPlanGroupIsSelected()),
              (n = getSelectedSellingPlanId()),
              jQuery(
                '#appstle_subscription_widget' +
                  widgetId +
                  ' .appstleLoyaltyTable',
              ).remove();
            var o =
                null === (t = RSConfig) || void 0 === t
                  ? void 0
                  : null === (i = t.sellingPlansJson) || void 0 === i
                  ? void 0
                  : i.find(function (e) {
                      return (
                        (null == e ? void 0 : e.id.split('/').pop()) ===
                        String(n)
                      );
                    }),
              s = null;
            if (
              (null != o &&
                o.freeTrialEnabled &&
                w.push({
                  perkText: getPerkText(
                    0,
                    o.freeTrialCount,
                    o.freeTrialInterval,
                    null == o ? void 0 : o.freeTrialEnabled,
                  ),
                }),
              null != o &&
                o.afterCycle2 &&
                0 < parseFloat(o.discountOffer2) &&
                w.push({
                  perkText: getPerkText(
                    getBillingCycleText(o.afterCycle2),
                    o.discountOffer2,
                    o.discountType2,
                    !1,
                  ),
                }),
              null != o &&
                null !== (l = o.appstleCycles) &&
                void 0 !== l &&
                l.length)
            ) {
              var r =
                null == o
                  ? void 0
                  : o.appstleCycles.sort(function (e, n) {
                      return e.afterCycle - n.afterCycle;
                    });
              null == r ||
                r.forEach(function (n) {
                  var e = '',
                    t = '',
                    i = '';
                  if ('FREE_PRODUCT' === n.discountType) {
                    var l, a, o, s, r, p, c, d, u, g, f, _, v, y, m, b;
                    if (
                      ((e =
                        null === (l = window) || void 0 === l
                          ? void 0
                          : null === (a = l.products) || void 0 === a
                          ? void 0
                          : null === (o = a[n.freeProductHandle]) ||
                            void 0 === o
                          ? void 0
                          : o.title),
                      1 <
                        (null === (s = window) || void 0 === s
                          ? void 0
                          : null === (r = s.products) || void 0 === r
                          ? void 0
                          : null === (p = r[n.freeProductHandle]) ||
                            void 0 === p
                          ? void 0
                          : p.variants.length))
                    )
                      e =
                        e +
                        ' - ' +
                        (null ===
                          (b = (
                            null === (v = window) || void 0 === v
                              ? void 0
                              : null === (y = v.products) || void 0 === y
                              ? void 0
                              : null === (m = y[n.freeProductHandle]) ||
                                void 0 === m
                              ? void 0
                              : m.variants.filter(function (e) {
                                  return (
                                    e.id ===
                                    parseInt(
                                      null == n ? void 0 : n.freeVariantId,
                                    )
                                  );
                                })
                          ).pop()) || void 0 === b
                          ? void 0
                          : b.title);
                    (i =
                      null === (c = window) || void 0 === c
                        ? void 0
                        : null === (d = c.products) || void 0 === d
                        ? void 0
                        : null === (u = d[n.freeProductHandle]) || void 0 === u
                        ? void 0
                        : u.featured_image),
                      (t = formatPrice(
                        null === (g = window) || void 0 === g
                          ? void 0
                          : null === (f = g.products) || void 0 === f
                          ? void 0
                          : null === (_ = f[n.freeProductHandle]) ||
                            void 0 === _
                          ? void 0
                          : _.price,
                      ));
                  }
                  (parseFloat(n.value) ||
                    0 === parseFloat(n.value) ||
                    e ||
                    'SHIPPING' === n.discountType) &&
                    w.push({
                      perkText: getPerkText(
                        getBillingCycleText(n.afterCycle),
                        n.value,
                        n.discountType,
                        !1,
                        e,
                        i,
                        t,
                      ),
                    });
                });
            }
            var p =
              (null === (a = RSConfig) || void 0 === a
                ? void 0
                : a.loyaltyDetailsLabelText) || 'Subscriber Rewards';
            if (w.length) {
              var c = '<div class="appstleLoyaltyTable" '
                .concat(
                  e ? '' : 'style="display: none;"',
                  '><table width="100%">\n                        <div class="appstle_loyalty_title">',
                )
                .concat(
                  p,
                  '</div>\n                        <tbody>\n                          {{#items}}\n                            <tr>\n                              <td>{{{perkText}}}</td>\n                            </tr>\n                           {{/items}}\n                        </tbody>\n                      </table></div>',
                );
              (w = { items: w }),
                (s = Mustache.render(c, w)),
                jQuery(s).insertAfter(
                  '#appstle_subscription_widget' +
                    widgetId +
                    ' .appstle_subscription_wrapper',
                );
            }
          }
          function getPerkText(e, n, t, i, l, a, o) {
            if (
              JSON.parse(RS.Config.labels)[
                'appstle.subscription.wg.loyaltyPerkDescriptionTextV2'
              ]
            ) {
              var s = {
                discount: n,
                discountType: t,
                formatDiscountedPrice: formatPrice(100 * n),
                freeProductName: l,
                isDiscountTypePercentage: 'PERCENTAGE' === t,
                isDiscountTypeShipping: 'SHIPPING' === t,
                isDiscountTypeFreeProduct: 'FREE_PRODUCT' === t,
                isDiscountTypeFixed: 'FIXED' === t,
                isDiscountTypeFixedPrice: 'PRICE' === t,
                isFreeTrial: i,
                isCartPage: !1,
                featured_image: a,
                productPrice: o,
                billingCycleBlock:
                  '<span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'.concat(
                    e,
                    '</span>',
                  ),
              };
              return Mustache.render(
                JSON.parse(RS.Config.labels)[
                  'appstle.subscription.wg.loyaltyPerkDescriptionTextV2'
                ],
                s,
              );
            }
            return 'PERCENTAGE' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(n + '% off', '</span></span>.')
              : 'SHIPPING' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'.concat(
                  e,
                  '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  'shipping at '.concat(formatPrice(100 * n)),
                  '</span></span>.',
                )
              : 'FREE_PRODUCT' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">FREE PRODUCT (',
                  )
                  .concat(l, ')</span></span>.')
              : 'FIXED' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(formatPrice(100 * n) + ' off', '</span></span>.')
              : 'PRICE' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get at <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(formatPrice(100 * n), '</span></span>.')
              : i
              ? 'Get <span class="appstle-loyalty-free-trial-discount">'
                  .concat(
                    n,
                    ' <span class="appstle-loyalty-free-trial-discount-count" style="text-transform: lowercase;">',
                  )
                  .concat(t)
                  .concat(
                    1 < n ? 's' : '',
                    '</span></span> <span class="appstle-loyalty-free-trial-text">free trial.</span>',
                  )
              : 'PERCENTAGE' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(n + '% off', '</span></span>.')
              : 'SHIPPING' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'.concat(
                  e,
                  '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  'shipping at '.concat(formatPrice(100 * n)),
                  '</span></span>.',
                )
              : 'FREE_PRODUCT' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">FREE PRODUCT (',
                  )
                  .concat(l, ')</span></span>.')
              : 'FIXED' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(formatPrice(100 * n) + ' off', '</span></span>.')
              : 'PRICE' === t
              ? 'After <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                  .concat(
                    e,
                    '</span> order</span>, <span class="appstle-loyalty-discount">get at <span class="appstle-loyalty-discount-amount">',
                  )
                  .concat(formatPrice(100 * n), '</span></span>.')
              : void 0;
          }
          function getSellingPlanDetails(n, t) {
            var e,
              i,
              l = (
                null === (e = product) || void 0 === e
                  ? void 0
                  : e.selling_plan_groups.filter(function (e) {
                      return (null == e ? void 0 : e.id) === n;
                    })
              ).pop();
            return (
              null == l
                ? void 0
                : null === (i = l.selling_plans) || void 0 === i
                ? void 0
                : i.filter(function (e) {
                    return (null == e ? void 0 : e.id) === t;
                  })
            ).pop();
          }
          function getSellingPlanDetailsById(n) {
            var e, t;
            return null === (e = RSConfig) || void 0 === e
              ? void 0
              : null === (t = e.sellingPlansJson) || void 0 === t
              ? void 0
              : t.find(function (e) {
                  return (
                    (null == e ? void 0 : e.id.split('/').pop()) === String(n)
                  );
                });
          }
          function checkIfSellingPlanGroupIsSelected(e) {
            if (e) {
              var n = !1;
              try {
                n = e.find('[name=selling_plan]:checked').val();
              } catch (e) {}
              return n;
            }
            n = !1;
            try {
              n = jQuery('#appstle_subscription_widget' + widgetId)
                .find('[name=selling_plan]:checked')
                .val();
            } catch (e) {}
            return n;
          }
          function buildDiscountText(e) {
            var n = { selectedDiscountPercentage: e };
            return wrapPriceWithSpanTag(
              Mustache.render(RS.Config.selectedDiscountFormat, n),
            );
          }
          function updateSellingPlanValueToFinalPrice() {
            var e,
              n,
              t,
              i,
              l,
              a = {
                regular: {
                  sellingPrice: RSConfig.priceSelector,
                  saleBadgeTop: RSConfig.badgeTop,
                },
              }.regular,
              o =
                widgetLabels[
                  'appstle.subscription.wg.productPageUnitPriceSelectorV2'
                ] || '.f-price__unit';
            null !== (e = RSConfig) && void 0 !== e && e.widgetParentSelector
              ? (jQuery('#appstle_subscription_widget' + widgetId)
                  .parents(
                    null === (t = RSConfig) || void 0 === t
                      ? void 0
                      : t.widgetParentSelector,
                  )
                  .find('.appstle_subscription_final_price')
                  .remove(),
                jQuery('#appstle_subscription_widget' + widgetId)
                  .parents(
                    null === (i = RSConfig) || void 0 === i
                      ? void 0
                      : i.widgetParentSelector,
                  )
                  .find('.appstle_subscription_element')
                  .remove(),
                jQuery('#appstle_subscription_widget' + widgetId)
                  .parents(
                    null === (l = RSConfig) || void 0 === l
                      ? void 0
                      : l.widgetParentSelector,
                  )
                  .find('.appstle_subscription_compare_price')
                  .remove())
              : (jQuery('.appstle_subscription_final_price').remove(),
                jQuery('.appstle_subscription_element').remove(),
                jQuery('.appstle_subscription_compare_price').remove());
            jQuery('.appstle_subscription_unit_price').remove();
            var s,
              r = getSelectedSellingPlanPrice(),
              p = getSellingPlanDiscountPercentage(),
              c = jQuery(a.sellingPrice),
              d = jQuery(o + ':not(.appstle_subscription_unit_price)');
            null !== (n = RSConfig) &&
              void 0 !== n &&
              n.widgetParentSelector &&
              (c = jQuery('#appstle_subscription_widget' + widgetId)
                .parents(
                  null === (s = RSConfig) || void 0 === s
                    ? void 0
                    : s.widgetParentSelector,
                )
                .find(a.sellingPrice));
            if (
              (c.css('text-decoration', ''),
              c.removeAttr('data-appstle-price-modified'),
              d.show(),
              a.sellingPrice && p)
            ) {
              if (checkIfSellingPlanGroupIsSelected()) {
                var u = buildDiscountText(p);
                if (u) {
                  var g = jQuery(
                    '<span class="appstle_subscription_element appstle_subscription_save"> '.concat(
                      u,
                      ' </span>',
                    ),
                  );
                  g && g.css('top', a.saleBadgeTop);
                  var f = c.first().clone();
                  f.addClass('appstle_subscription_final_price'), f.html(r);
                  var _ = getAttributes(f);
                  if (
                    (Object.keys(_).forEach(function (e) {
                      'class' !== e && 'style' !== e && f.removeAttr(e);
                    }),
                    c.css('text-decoration', 'line-through'),
                    0 < f.length && f.insertBefore(c),
                    null != d && d.length)
                  ) {
                    var v = getSelectedSellingPlanId(),
                      y = getVariantId(),
                      m = getSellingPlanAllocation(y, parseInt(v));
                    d.each(function (e, n) {
                      var t = jQuery(n).clone();
                      t.text(
                        ''
                          .concat(
                            wrapPriceWithSpanTag(
                              formatPrice(null == m ? void 0 : m.unit_price),
                            ),
                            '/',
                          )
                          .concat(getVariantUnitPriceUnit(y)),
                      ),
                        t.addClass('appstle_subscription_unit_price'),
                        t.insertAfter(n);
                    }),
                      d.hide();
                  }
                  v =
                    'gid://shopify/SellingPlan/' +
                    (v = getSelectedSellingPlanId());
                  var b = RSConfig.sellingPlansJson.find(function (e) {
                    return e.id == v;
                  });
                  'PRICE' != (b ? b.discountType : void 0)
                    ? g.insertAfter(c)
                    : $(f).addClass('fixedDiscount');
                }
              }
              c.attr('data-appstle-price-modified', !0);
            } else c.attr('data-appstle-price-modified', !0);
          }
          function getAttributes(e) {
            var n,
              t = {};
            e &&
              0 < e.length &&
              $.each(
                null === (n = e[0]) || void 0 === n ? void 0 : n.attributes,
                function (e, n) {
                  t[n.name] = n.value;
                },
              );
            return t;
          }
          function getSellingPlanDiscountPercentage(e) {
            var n, t, i, l, a;
            if (!(a = parseInt(getSelectedSellingPlanId()))) return null;
            if (
              (product.selling_plan_groups.forEach(function (n) {
                'appstle' === n.app_id &&
                  n.selling_plans.forEach(function (e) {
                    isSellingPlanVisible(e.id) && e.id === a && (l = n);
                  });
              }),
              l.selling_plans.forEach(function (e) {
                e.id === a && (a = e);
              }),
              e &&
                2 ==
                  (null === (n = a) || void 0 === n
                    ? void 0
                    : null === (t = n.price_adjustments) || void 0 === t
                    ? void 0
                    : t.length))
            ) {
              var o,
                s,
                r = [];
              return (
                null === (o = a) ||
                  void 0 === o ||
                  null === (s = o.price_adjustments) ||
                  void 0 === s ||
                  s.forEach(function (e) {
                    'percentage' !== (null == e ? void 0 : e.value_type)
                      ? r.push(
                          formatPriceWithQuantity(null == e ? void 0 : e.value),
                        )
                      : r.push((null == e ? void 0 : e.value) + '%');
                  }),
                r
              );
            }
            var p =
              null === (i = a) || void 0 === i
                ? void 0
                : i.price_adjustments[0];
            return null == p || null == p.value || 0 == p.value
              ? null
              : 'percentage' !== (null == p ? void 0 : p.value_type)
              ? formatPriceWithQuantity(null == p ? void 0 : p.value)
              : (null == p ? void 0 : p.value) + '%';
          }
          function updateWidgetElements(e) {
            registerAndTriggerEventsForFormFields();
          }
          function updateStateOfWidget(e) {
            updateSelectValueToRadio(e),
              updateOneTimePurchaseValueToRadio(),
              updateSellingPlanValueToFinalPrice(),
              setTimeout(function () {
                return updateFormFields(getCurrentSellingPlanId());
              }, 30),
              dispatchAppstleEvent('SubscriptionWidgetUpdated'),
              jQuery('.appstle-hidden').removeClass('appstle-hidden');
          }
          function createJsonformat() {
            var e,
              n,
              t,
              i = {},
              l = getVariantId(),
              a = null;
            standAloneElement
              ? (a = (
                  null == standAloneProduct
                    ? void 0
                    : standAloneProduct.variants.filter(function (e) {
                        return String(null == e ? void 0 : e.id) === String(l);
                      })
                ).pop().price)
              : (a =
                  null === (n = RSConfig) || void 0 === n
                    ? void 0
                    : null === (t = n.variantsById[l]) || void 0 === t
                    ? void 0
                    : t.price);
            return (
              (i.requires_selling_plan =
                null === (e = product) || void 0 === e
                  ? void 0
                  : e.requires_selling_plan),
              (i.oneTimePuchaseText = RS.Config.oneTimePurchaseText),
              (i.oneTimePuchaseAmount = buildOneTimePriceText(
                formatPriceWithQuantity(a),
              )),
              (i.subscribeText = RS.Config.subscriptionOptionText),
              (i.widgetId = widgetId),
              ((i = Object.assign(
                Selling_Plan_Variants_Global,
                i,
              )).tooltipTitle = RS.Config.tooltipTitle),
              (i.toolTipDescription = RS.Config.tooltipDesctiption),
              (i.companyWebsite = 'https://appstle.com/'),
              (i.companyName = 'POWERED BY APPSTLE'),
              (i.showStaticTooltip = RS.Config.showStaticTooltip),
              (i.purchaseOptionsText = RS.Config.purchaseOptionsText),
              (i.deliveryFrequencyText = RS.Config.sellingPlanSelectTitle),
              (i.showAppstleLink = RS.Config.showAppstleLink),
              (i.subscriptionOptionSelectedDefault =
                RS.Config.subscriptionOptionSelectedByDefault),
              (i.showSubOptionBeforeOneTime =
                RS.Config.showSubOptionBeforeOneTime),
              (i.showTooltip = RS.Config.showTooltip),
              (i.oneTimeFrequencyText =
                widgetLabels['appstle.subscription.wg.oneTimeFrequencyTextV2']),
              (i.cancelAnytimeLabelTextV2 =
                widgetLabels[
                  'appstle.subscription.wg.cancelAnytimeLabelTextV2'
                ]),
              (i.noSubscriptionLabelTextV2 =
                widgetLabels[
                  'appstle.subscription.wg.noSubscriptionLabelTextV2'
                ]),
              i
            );
          }
          function getCssAsString(n) {
            var t = {};
            return n
              ? (Object.keys(n).forEach(function (e) {
                  n[e] && (t[e] = n[e]);
                }),
                JSON.stringify(t)
                  .split('"')
                  .join('')
                  .split('{')
                  .join('')
                  .split('}')
                  .join('')
                  .split(',')
                  .join(';'))
              : '';
          }
          function updateHistoryState() {
            setTimeout(updateHistory, 30);
          }
          function updateHistory() {
            if (localWindowVariant) {
              var e = localWindowVariant.id;
              if (history.replaceState && e) {
                var n =
                    window.location.protocol +
                    '//' +
                    window.location.host +
                    window.location.pathname +
                    '?',
                  t = Object.fromEntries(new URLSearchParams(location.search));
                if (checkIfSellingPlanGroupIsSelected()) {
                  var i = getSelectedSellingPlanId();
                  i && (t.selling_plan = i);
                } else t.selling_plan = '';
                (t.variant = e),
                  (n += serializeQueryParams(t)) !== location.href &&
                    window.history.replaceState({ path: n }, '', n);
              }
            }
          }
          function serializeQueryParams(e) {
            var n = [];
            for (var t in e)
              e.hasOwnProperty(t) &&
                e[t] &&
                n.push(encodeURIComponent(t) + '=' + encodeURIComponent(e[t]));
            return n.join('&');
          }
          function updateWidgetUIBasedOnQueryParams() {
            if (
              0 !== jQuery('#appstle_subscription_widget' + widgetId).length
            ) {
              var t = urlParamsToObject(),
                e = jQuery('#appstle_subscription_widget' + widgetId).closest(
                  'form[action$="/cart/add"]',
                );
              if (
                (0 < e.find('input[value=' + t.variant + ']').length ||
                  0 < e.find('option[value=' + t.variant + ']').length) &&
                (0 < e.find('option[value=' + t.selling_plan + ']').length ||
                  0 < e.find('input[value=' + t.selling_plan + ']').length) &&
                t.selling_plan
              ) {
                var n,
                  i,
                  l = jQuery(
                    Array.prototype.slice
                      .call(
                        jQuery(
                          '#appstle_subscription_widget' +
                            widgetId +
                            ' input[name=selling_plan]',
                        ),
                      )
                      .filter(function (e) {
                        return (
                          jQuery(e).val() === t.selling_plan ||
                          !!jQuery(e)
                            .parents('.appstle_subscription_wrapper_option')
                            .find('option[value='.concat(t.selling_plan, ']'))
                            .length ||
                          !!jQuery(e)
                            .parents('.appstle_subscription_wrapper_option')
                            .find('input[value='.concat(t.selling_plan, ']'))
                            .length
                        );
                      })
                      .pop(),
                  );
                l.length && (l[0].checked = !0);
                var a,
                  o = null;
                if (
                  ((o =
                    null !== (n = RSConfig) &&
                    void 0 !== n &&
                    n.switchRadioButtonWidget
                      ? l
                          .parents('.appstle_subscription_wrapper_option')
                          .find('.appstle_subscribe_option')
                      : l
                          .parents('.appstle_subscription_wrapper_option')
                          .find('select')),
                  null !== (i = RSConfig) &&
                    void 0 !== i &&
                    i.switchRadioButtonWidget)
                )
                  null !== (a = o) && void 0 !== a && a.length
                    ? o.find('input[type=radio]').each(function (e, n) {
                        $(n).removeAttr('checked'),
                          jQuery(n).attr('value') === t.selling_plan &&
                            $(n).attr('checked', !0);
                      })
                    : jQuery('#appstle_subscription_widget' + widgetId)
                        .find('input[type=radio]')
                        .each(function (e, n) {
                          $(n).removeAttr('checked'),
                            jQuery(n).attr('value') === t.selling_plan &&
                              $(n).attr('checked', !0);
                        });
                else
                  o.find('option').each(function (e, n) {
                    jQuery(n).attr('value') === t.selling_plan &&
                      (o[0].selectedIndex = e);
                  });
                l.change(),
                  o.change(),
                  jQuery('#appstle_subscription_widget' + widgetId)
                    .find('input[type=radio]')
                    .change();
              }
            }
          }
          function accountPageStyle() {
            var e = RSConfig.css;
            jQuery('<style>'.concat(e.customCSS, '</style>')).appendTo(
              jQuery('head'),
            );
          }
          function parseElementCSS() {
            var e = '';
            try {
              var n,
                t,
                i,
                l = JSON.parse(
                  null === (n = RS) || void 0 === n
                    ? void 0
                    : null === (t = n.Config) || void 0 === t
                    ? void 0
                    : null === (i = t.css) || void 0 === i
                    ? void 0
                    : i.elementCSS,
                );
              if (l)
                for (var a = 0; a < (null == l ? void 0 : l.length); a++)
                  e += '<style>'.concat(l[a], '</style>');
            } catch (e) {}
            return e;
          }
          function addStyle(e) {
            var n = RSConfig.css;
            jQuery(
              '<style>\n\n     #appstle_subscription_widget'
                .concat(
                  e,
                  '{\n            width: 100%;\n            text-align: left;\n            margin-top: 17px;\n            clear: both;\n            max-width: 400px;\n            ',
                )
                .concat(
                  getCssAsString(n.appstle_subscription_widget),
                  '\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(e, '{\n          ')
                .concat(
                  getCssAsString(n.appstle_widget_text_color),
                  '\n        }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper {\n               border: 1.5px solid #cccccc;\n              // box-shadow: 0 0 0 1px #c4cdd5;\n              border-radius: 5px;\n              margin-bottom: 5px;\n              margin-top: 10px;\n              ',
                )
                .concat(
                  getCssAsString(n.appstle_subscription_wrapper),
                  '\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option {\n              display: flex;\n              position: relative;\n              padding: 16px 16px;\n              flex-direction: column;\n          }\n          #appstle_subscription_widget',
                )
                .concat(e, ' .appstle_selected_background {\n            ')
                .concat(
                  getCssAsString(n.appstle_selected_background),
                  '\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option:first-child {\n             // box-shadow: 0 1px 0 0 #c4cdd5;\n             // border-bottom: inherit;\n          }\n            #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option:first-child:last-child {\n             border-bottom: none;\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option:not(.appstle_include_dropdown) {\n            justify-content: center;\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option.appstle_include_dropdown {\n            flex-direction: column;\n            justify-content: center;\n          }\n\n          .appstle_circle {\n            position: relative;\n          }\n\n\n\n        [name="selling_plan"] {\n          position: absolute;\n          opacity: 0;\n      }\n\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscribe_option {\n              margin-left: 29px;\n              margin-top: 25px;\n              display: flex;\n                  flex-direction: column;\n              align-items: flex-start;\n              text-align: left;\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_amount {\n              margin-left: auto;\n          }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_circle {\n              display: flex;\n              height: 18px;\n              width: 18px;\n              border: 2px solid #3a3a3a;\n              border-radius: 50%;\n              margin-right: 10px;\n              justify-content: center;\n              align-items: center;\n              flex-shrink: 0;\n              ',
                )
                .concat(
                  getCssAsString(n.appstle_circle),
                  '\n            }\n\n\n            span.appstle_dot {\n              height: 10px;\n              width: 10px;\n              transform: scale(0);\n              background-color: #3a3a3a;\n              border-radius: 50%;\n              flex-shrink: 0;\n              transition: transform 0.2s;\n            }\n\n          #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper_option input[type=radio]:checked + label .appstle_circle .appstle_dot {\n            transform: scale(1);\n              ',
                )
                .concat(
                  getCssAsString(n.appstle_dot),
                  '\n            }\n\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_radio_label {\n          display: flex !important;\n          align-items: center;\n          margin: 0;\n          padding: 0;\n          background: none;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_select_label {\n          display: flex !important;\n          align-items: center;\n          margin: 0;\n          padding: 0;\n          background: none;\n          margin-bottom: 7px;\n          font-size: 12px;\n\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_form_field_input, #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_form_field_text_input {\n          width: 100%;\n          padding-left: 20px;\n          padding-right: 20px;\n          height: 43px !important;\n          border-radius: 12px;\n          border: 1px solid #0000003d!important;\n          font-size: 1.5rem;\n          color: #495057;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_tooltip {\n          -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n          box-shadow: 0 2px 4px rgb(0 0 0 / 15%);\n          background-color: #3a3a3a;\n          border-radius: 5px;\n          left: 0;\n          color: #fff;\n          transition: transform .2s cubic-bezier(.215,.61,.355,1);\n          -ms-transform: translateY(0);\n          transform: translateY(100%) scaleY(0);\n          transform-origin: center top;\n          opacity: 0;\n          position: absolute;\n          bottom: 1px;\n          // border-bottom-left-radius: 0;\n          min-width: 250px;\n          ',
                )
                .concat(
                  getCssAsString(n.appstle_tooltip),
                  '\n        }\n\n\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' [data-appstle-icon] {\n            -ms-flex-item-align: end;\n            backface-visibility: hidden;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  " [data-appstle-icon]:after {\n              border: solid transparent;\n              border-top-color: #3a3a3a;\n              border-width: 9px;\n              content: '';\n              position: absolute;\n              pointer-events: none;\n              opacity: 0;\n              left: 2px;\n              bottom: 0;\n              -ms-transform: translateX(-50%) translateY(10px) rotate(180deg);\n              transform: translateY(10px) rotate(180deg);\n              transition-delay: 0;\n              visibility: hidden;\n              transition: transform .2s cubic-bezier(.215,.61,.355,1);\n              z-index: 99999999;\n              background: none;\n              padding: 0;\n              ",
                )
                .concat(
                  getCssAsString(n.appstle_tooltip_border_top_color),
                  '\n        }\n\t\t@media screen and (max-width: 1024px) {\n\n\t\t\t#appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' [data-appstle-icon].appstle-tooltip-show .appstle_tooltip {\n\t\t\t\t  opacity: 1;\n\t\t\t\t  visibility: visible;\n\t\t\t\t  transform: translateY(100%) scaleY(1);\n\t\t\t\t  bottom: 1px;\n\t\t\t\t  z-index: 99999999;\n\t\t\t}\n\n\t\t\t#appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' [data-appstle-icon].appstle-tooltip-show:after {\n\t\t\t  opacity: 1;\n\t\t\t  visibility: visible;\n\t\t\t  -ms-transform: translateX(-50%) translateY(0) rotate(180deg);\n\t\t\t  transform: translateY(0) rotate(180deg);\n\t\t\t}\n\t\t}\n        @media screen and (min-width: 1025px) {\n\t\t\t#appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' [data-appstle-icon]:hover .appstle_tooltip {\n\t\t\t\t  opacity: 1;\n\t\t\t\t  visibility: visible;\n\t\t\t\t  transform: translateY(100%) scaleY(1);\n\t\t\t\t  bottom: 1px;\n\t\t\t\t  z-index: 99999999;\n\t\t\t}\n\n\t\t\t#appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' [data-appstle-icon]:hover:after {\n\t\t\t  opacity: 1;\n\t\t\t  visibility: visible;\n\t\t\t  -ms-transform: translateX(-50%) translateY(0) rotate(180deg);\n\t\t\t  transform: translateY(0) rotate(180deg);\n\t\t\t}\n\t\t}\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_tooltip_wrapper {\n          position: relative;\n          margin-bottom: 6px;\n          display: inline-flex;\n          align-items: center;\n          padding-top: 11px;\n          box-sizing: border-box;\n          margin-left: 0px;\n          padding-bottom: 11px;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_tooltip_wrapper_static {\n          font-size: 13px;\n          background-color: beige;\n          border-radius: 6px;\n          padding: 23px;\n          margin-bottom: 10px;\n          ',
                )
                .concat(
                  getCssAsString(n.appstle_tooltip),
                  '\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .tooltip_subscription_svg {\n             height: 22px;\n            width: 22px;\n            margin-right: 10px;\n            fill: black;\n            ',
                )
                .concat(
                  getCssAsString(n.tooltip_subscription_svg),
                  '\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_radio_wrapper {\n            display: flex;\n            align-items: flex-start;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_amount_wrapper {\n          margin-left: auto;\n          text-align: right;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_amount_wrapper .appstle_prepaid_description, #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_amount_wrapper .appstle_selling_plan_unit_price, .appstle_one_time_unit_price {\n          font-size: 12px;\n          opacity: 0.8;\n        }\n\n        .appstle_subscription_final_price {\n            margin-right: 10px;\n            text-decoration: none;\n            color: #da4f49;\n            ',
                )
                .concat(
                  getCssAsString(n.appstle_subscription_final_price),
                  '\n        }\n\n        .appstle_subscription_save {\n            margin-left: 10px;\n              padding: 2px 6px;\n              border: 1px solid #da4f49;\n              border-radius: 3px;\n              font-size: 10px;\n              color: #da4f49;\n              font-weight: bold;\n              display: inline;\n              position: relative;\n              top: -3px;\n              letter-spacing: 1px;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_subscription_wrapper .appstle_select {\n            width: 100%;\n            margin: 0;\n            ',
                )
                .concat(
                  getCssAsString(n.appstle_select),
                  '\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_hide_subsOption {         \n          opacity: 0;\n          margin-top: 0;\n        }\n\n        #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_tooltip_content {\n          padding: 16px;\n        }\n\n        body #appstle_subscription_widget',
                )
                .concat(
                  e,
                  ' .appstle_tooltip_wrapper .appstle_tooltip .appstle_tooltip_appstle {\n          padding: 12px !important;\n          font-size: 8px !important;\n          letter-spacing: 2px !important;\n          text-align: right !important;\n          background: #13b5ea !important;\n          border-bottom-left-radius: 4px !important;\n          border-bottom-right-radius: 4px !important;\n          display: block !important;\n        }\n\n        .appstle_link {\n          color: inherit !important;\n          text-decoration: none !important;\n          cursor: pointer !important;\n        }\n\n        .appstleRadioSellingPlanWrapper {\n          display: flex;\n          flex-direction: column;\n        }\n\n        .appstle-radio-input-wrapper{\n          display: flex;\n          align-items: center;\n        }\n        .appstleLoyaltyTable {\n          margin-top: 20px;\n        }\n\n        .appstle_loyalty_title {\n          margin-bottom: 10px;\n        }\n\n        .appstle-loyalty-billing-cycle-count, .appstle-loyalty-discount-amount, .appstle-loyalty-free-trial-discount {\n          color: #198946;\n          font-weight: bold;\n        }\n\n        .appstle_fields_wrapper {\n          margin-bottom: 20px;\n        }\n\n        .as-date-input-wrapper {\n          position: relative;\n        }\n\n        .as-date-input-wrapper .ui-datepicker-trigger {\n          position: absolute;\n          height: 100%;\n          width: 40px;\n          right: 0;\n          top: 0;\n        }\n\n        .as-date-input-wrapper .ui-datepicker-trigger img {\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          width: 28px;\n          transform: translate(-50%, -50%);\n        }\n\n        .appstle_subscription_compare_amount  {\n          text-decoration: line-through;\n        }\n\n        #ui-datepicker-div {\n          z-index: 1000000 !important;\n        }\n\n        .appstle_one_time_details_wrapper {\n          display: flex;\n          flex-grow: 1;\n          align-items: flex-start;\n      }\n\n      .appstle_one_time_description_text {\n        margin-left: 28px;\n        font-size: 12px;\n      }\n\n      .appstle_one_time_price_wrapper {\n        margin-left: auto;\n        text-align: right;\n      }\n\n      .appstle_one_time_unit_price {\n        text-align: right;\n      }\n\n      .appstle_sub_widget input[name=selling_plan_radio], .appstle_sub_widget input[name=selling_plan_radio_prepaid] {\n        appearance: auto;\n        height: auto;\n        overflow: unset;\n        position: relative;\n        width: unset;\n        margin: 0 !important;\n    }\n    .appstle_sub_widget *:empty {\n      display: block !important;\n  }\n  .prepaidPlansDropdownWrapper, .appstle_subscription_wrapper_option+.payAsYouGoPlansDropdownWrapper {\n    border-top: 1.5px solid #cccccc;\n}\n.appstleSelectedSellingPlanOptionDescription {\n    font-size: 12px;\n    margin-top: 4px;\n}\n\n.appstleSellingPlanDescription {\n        font-size: 12px;\n}\n\n.appstleRadioSellingPlanWrapper label {\nmargin-left: 10px;\nline-height: 1;\n}\n\n.appstleRadioSellingPlanWrapper input {\nmin-height: auto !important;\n}\n\n.appstle-radio-wrapper {\nmargin-top: 10px;\n}\n\n.appstle_subscribe_option {\n    display: grid !important;\n    grid-template-rows: 1fr;\n    transition: grid-template-rows 500ms, opacity 300ms 300ms;\n}\n\n.appstle_onetime_option {\n  display: grid !important;\n  transition: grid-template-rows 500ms, opacity 300ms 300ms;\n  grid-template-rows: 0fr;\n}\n\n.appstle-active-option .appstle_onetime_option {\n  grid-template-rows: 1fr;\n}\n\n\n.appstle_subscribe_option.appstle_hide_subsOption > div {\n    overflow: hidden;\n}\n\n.appstle_subscribe_option.appstle_hide_subsOption {\n    grid-template-rows: 0fr;\n}\n\n.appstle_subscribe_option.appstle_hide_subsOption {\n    height: auto !important;\n    visibility: unset !important;\n    overflow: hidden;\n}\n\n.appstle_subscribe_option_grid {\n    overflow: hidden;\n}\n.appstle_onetime_option_grid {\n  overflow: hidden;\n}\n\n.appstle-atc-button {\n    display: block;\n    width: 100%;\n    background: #3a3a3a;\n    color: #fff;\n    border: none;\n    padding: 15px 30px;\n    margin-top: 20px;\n}\n\nspan.appstle_dot {\n    transition: all 0.2s;\n}.\n\nspan.appstle_dot {\n    height: 10px;\n    width: 10px;\n    transform: scale(0);\n    background-color: #3a3a3a;\n    border-radius: 50%;\n    flex-shrink: 0;\n}\n\n.appstle-atc-button-hide {\n    display: none;\n}\n.icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    vertical-align: middle;\n    fill: currentColor;\n}\n\n.icon-spinner {\n  -moz-animation: spin 500ms infinite linear;\n  -o-animation: spin 500ms infinite linear;\n  -webkit-animation: spin 500ms infinite linear;\n  animation: spin 500ms infinite linear; }\n\n@-webkit-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -ms-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@-moz-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -ms-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -ms-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -ms-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n    .appstle_subscribe_option.appstle_hide_subsOption .appstleSellingPlanDescription {\n      display: none !important;\n      }\n\n  \n      </style>\n      ',
                )
                .concat(parseElementCSS(), '\n        <style>')
                .concat(n.customCSS, '</style>'),
            ).appendTo(jQuery('head'));
          }
        }
        function getBillingCycleText(e) {
          var n = e % 10,
            t = e % 100;
          return 1 == n && 11 != t
            ? e + '<sup>st</sup>'
            : 2 == n && 12 != t
            ? e + '<sup>nd</sup>'
            : 3 == n && 13 != t
            ? e + '<sup>rd</sup>'
            : e + '<sup>th</sup>';
        }
        function renderStandAloneWidget() {
          var a = Array.prototype.slice.call(
              jQuery(
                '.appstle_stand_alone_selector:not(.appstle_stand_alone_selector_processed)',
              ),
            ),
            o = -1;
          !(function n() {
            if (null != a && a.length) {
              var e,
                t,
                i = a.shift(),
                l = $(i).data('product-data');
              (o += 1),
                jQuery(i).parents('form').find('.appstle_sub_widget').length
                  ? n()
                  : l
                  ? (forceRenderWithProductHandle(l, $(i), o), n())
                  : fetch(
                      ((null === (e = Shopify) || void 0 === e
                        ? void 0
                        : null === (t = e.routes) || void 0 === t
                        ? void 0
                        : t.root) || '/') +
                        'products/'.concat(
                          jQuery(i).data('product-handle'),
                          '.js',
                        ),
                    )
                      .then(function (e) {
                        if (!e.ok)
                          throw new Error(
                            'HTTP error! Status: '.concat(e.status),
                          );
                        return e.json();
                      })
                      .then(function (e) {
                        jQuery(i).attr('data-product-data', e),
                          renderWidget(e, $(i), o),
                          n();
                      })
                      .catch(function (e) {
                        console.error(e);
                      });
            }
          })();
        }
        function urlIsProductPage() {
          return (
            decodeURIComponent(window.location.pathname).includes(
              '/products/',
            ) ||
            decodeURIComponent(window.location.pathname).includes(
              '/products_preview',
            )
          );
        }
        function urlIsAccountPage() {
          var e, n;
          return (
            '/account' === window.location.pathname ||
            (null === (e = window.location.pathname) || void 0 === e
              ? void 0
              : e.endsWith('/account')) ||
            (null === (n = window.location.pathname) || void 0 === n
              ? void 0
              : n.includes('/account'))
          );
        }
        function forceRenderWithProductHandle(e, n, t) {
          var i;
          if (e || !urlIsProductPage()) {
            var l, a;
            if (
              null != e &&
              null !== (i = e.selling_plan_groups) &&
              void 0 !== i &&
              i.length
            )
              renderWidget(e, n, t);
            else if (null != e && e.handle)
              fetch(
                ((null === (l = Shopify) || void 0 === l
                  ? void 0
                  : null === (a = l.routes) || void 0 === a
                  ? void 0
                  : a.root) || '/') +
                  'products/'.concat(null == e ? void 0 : e.handle, '.js'),
              )
                .then(function (e) {
                  if (!e.ok)
                    throw new Error('HTTP error! Status: '.concat(e.status));
                  return e.json();
                })
                .then(function (e) {
                  renderWidget(e, n, t);
                })
                .catch(function (e) {
                  console.error(e);
                });
            urlIsAccountPage() && renderWidget(e, n, t);
          }
        }
        (console.log('jQuery is loaded, after ' + tookTime + ' milliseconds!'),
        (RS.Config = Object.assign(
          RS.Config,
          'undefined' != typeof _RSConfig && null !== _RSConfig
            ? _RSConfig
            : {},
        )),
        (window.RSConfig = RS.Config),
        appstleStandAloneSelectorExists())
          ? renderStandAloneWidget()
          : forceRenderWithProductHandle(
              null === (_RSConfig55 = RSConfig) || void 0 === _RSConfig55
                ? void 0
                : _RSConfig55.product,
              void 0,
              0,
            );
        function wrapPriceWithSpanTag(e) {
          var n = document.createElement('textarea');
          return (n.innerHTML = decodeURI(encodeURI(e))), n.value;
        }
        function formatPrice(e) {
          var n,
            t,
            i = RS.Config.moneyFormat,
            l = i;
          i &&
            (l =
              null == i
                ? void 0
                : null === (t = i.replace('{% raw %}', '')) || void 0 === t
                ? void 0
                : t.replace('{% endraw %}', ''));
          'string' == typeof e && (e = e.replace('.', ''));
          var a,
            o = '',
            s = /\{\{\s*(\w+)\s*\}\}/,
            r =
              'undefined' != typeof Shopify &&
              Shopify.money_format &&
              1 < Shopify.money_format.length
                ? Shopify.money_format
                : '';
          a =
            'undefined' != typeof theme
              ? theme.moneyFormat
                ? theme.moneyFormat
                : theme.money_format
                ? theme.money_format
                : theme.settings && theme.settings.moneyFormat
                ? theme.settings.moneyFormat
                : theme.strings
                ? theme.strings.moneyFormat
                : ''
              : '';
          var p,
            c,
            d,
            u,
            g,
            f,
            _ = '';
          'true' ===
          (null === (n = RS.Config) || void 0 === n
            ? void 0
            : n.formatMoneyOverride)
            ? (_ = RS.Config.moneyFormat)
            : (_ =
                (null === (p = window) || void 0 === p
                  ? void 0
                  : p.shopifyCurrencyFormat) ||
                (null === (c = window) || void 0 === c
                  ? void 0
                  : c.moneyFormat) ||
                (null === (d = window) || void 0 === d
                  ? void 0
                  : null === (u = d.Currency) || void 0 === u
                  ? void 0
                  : u.money_format_no_currency) ||
                a ||
                (null === (g = RSConfig) || void 0 === g
                  ? void 0
                  : g.shopMoneyFormat) ||
                l ||
                r ||
                ((f = RSConfig.shopMoneyFormatWithCurrencyFormat),
                new DOMParser().parseFromString(f, 'text/html').documentElement
                  .textContent));
          function v(e, n, t, i) {
            if (((t = t || ','), (i = i || '.'), isNaN(e) || null === e))
              return 0;
            var l = (e = (e / 100).toFixed(n)).split('.');
            return (
              l[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + t) +
              (l[1] ? i + l[1] : '')
            );
          }
          switch (_.match(s)[1]) {
            case 'amount':
              o = v(e, 2);
              break;
            case 'amount_no_decimals':
              o = v(e, 0);
              break;
            case 'amount_with_comma_separator':
              o = v(e, 2, '.', ',');
              break;
            case 'amount_no_decimals_with_comma_separator':
              o = v(e, 0, '.', ',');
              break;
            case 'amount_no_decimals_with_space_separator':
              o = v(e, 0, ' ');
              break;
            case 'amount_with_apostrophe_separator':
              o = v(e, 2, "'");
          }
          return wrapPriceWithSpanTag(_.replace(s, o));
        }
        function displaySubscriptionPrice() {
          appstlePriceDisplaySelectorExists() &&
            (addFeaturePageCSS(),
            jQuery(
              '.appstle_stand_alone_price_display_selector:not(.appstle_stand_alone_price_display_selector_processed)',
            ).each(function (e) {
              var n,
                t,
                i,
                l,
                a = $(this).data('product-data'),
                o = Number.MAX_SAFE_INTEGER,
                s = !1;
              (null == a ||
                null === (n = a.variants) ||
                void 0 === n ||
                n.forEach(function (e) {
                  var n;
                  null == e ||
                    null === (n = e.selling_plan_allocations) ||
                    void 0 === n ||
                    n.forEach(function (e) {
                      var n, t;
                      (null == e
                        ? void 0
                        : null === (n = e.price_adjustments[0]) || void 0 === n
                        ? void 0
                        : n.price) < o &&
                        ((o =
                          null == e
                            ? void 0
                            : null === (t = e.price_adjustments[0]) ||
                              void 0 === t
                            ? void 0
                            : t.price),
                        (s = !0));
                    });
                }),
              s) &&
                ($(this)
                  .siblings(
                    (null === (t = RSConfig) || void 0 === t
                      ? void 0
                      : t.landingPagePriceSelector) ||
                      (null === (i = RS) || void 0 === i
                        ? void 0
                        : null === (l = i.Config) || void 0 === l
                        ? void 0
                        : l.landingPagePriceSelector) ||
                      'span.price, span.appstle_hide_old_price, .price',
                  )
                  .hide(),
                $(this).html(
                  wrapPriceWithSpanTag(buildSubscribeSaveSelector(o)),
                ));
              $(this).show(),
                $(this).addClass(
                  'appstle_stand_alone_price_display_selector_processed',
                );
            }));
        }
        jQuery(document).on(
          'click',
          ''.concat(
            null === (_window19 = window) || void 0 === _window19
              ? void 0
              : null === (_window19$RS = _window19.RS) ||
                void 0 === _window19$RS
              ? void 0
              : null === (_window19$RS$Config = _window19$RS.Config) ||
                void 0 === _window19$RS$Config
              ? void 0
              : _window19$RS$Config.quickViewClickSelector,
          ) || 'a.grid-product__link',
          function () {
            var e, n, t;
            if (
              0 <
              jQuery(
                ''.concat(
                  null === (e = window) || void 0 === e
                    ? void 0
                    : null === (n = e.RS) || void 0 === n
                    ? void 0
                    : null === (t = n.Config) || void 0 === t
                    ? void 0
                    : t.quickViewClickSelector,
                ) || 'a.grid-product__link',
              ).length
            ) {
              var i,
                l,
                a,
                o,
                s,
                r = function () {
                  var e;
                  appstleStandAloneSelectorExists()
                    ? renderStandAloneWidget()
                    : 0 ==
                        (null ===
                          (e = jQuery('#appstle_subscription_widget0')) ||
                        void 0 === e
                          ? void 0
                          : e.length) && renderWidget(void 0, void 0, 0);
                };
              if (
                ''.concat(
                  null === (i = window) || void 0 === i
                    ? void 0
                    : null === (l = i.RS) || void 0 === l
                    ? void 0
                    : null === (a = l.Config) || void 0 === a
                    ? void 0
                    : a.quickViewModalPollingSelector,
                ) ||
                'mahalia-coffee.myshopify.com' ==
                  (null === (o = window) || void 0 === o
                    ? void 0
                    : null === (s = o.Shopify) || void 0 === s
                    ? void 0
                    : s.shop)
              ) {
                !(function e() {
                  var n, t, i;
                  jQuery('.quickshop.quickshop-visible.quickshop-loaded')
                    .length ||
                  jQuery(
                    ''.concat(
                      null === (n = window) || void 0 === n
                        ? void 0
                        : null === (t = n.RS) || void 0 === t
                        ? void 0
                        : null === (i = t.Config) || void 0 === i
                        ? void 0
                        : i.quickViewModalPollingSelector,
                    ),
                  ).length
                    ? r()
                    : setTimeout(function () {
                        e();
                      }, 200);
                })();
              } else
                setTimeout(function () {
                  r();
                }, 500);
            }
          },
        ),
          setTimeout(displaySubscriptionPrice, 30);
        var targetNode = document.querySelector('body'),
          config = { attributes: !0, childList: !0, subtree: !0 },
          observer = new MutationObserver(displaySubscriptionPrice);
        function addFeaturePageCSS() {
          var e,
            n = null === (e = RSConfig) || void 0 === e ? void 0 : e.css;
          jQuery(
            '<style>.appstle_subscribesavetext{\n                  background-color:#c00303;\n                  color:#fff;\n                  padding:4px 8px;\n                  font-size:13px;\n                }</style>\n                  <style>'.concat(
              null == n ? void 0 : n.customCSS,
              '</style>',
            ),
          ).appendTo(jQuery('head'));
        }
        function buildSubscribeSaveSelector(e) {
          var n,
            t = { subscriptionPrice: formatPrice(e) };
          return wrapPriceWithSpanTag(
            Mustache.render(
              null === (n = RSConfig) || void 0 === n
                ? void 0
                : n.subscriptionPriceDisplayText,
              t,
            ),
          );
        }
        function appstleStandAloneSelectorExists() {
          return 0 < jQuery('.appstle_stand_alone_selector').length;
        }
        function appstlePriceDisplaySelectorExists() {
          return (
            0 < jQuery('.appstle_stand_alone_price_display_selector').length
          );
        }
        function appstleSubscriptionCustomerPortalInit(n) {
          var e;
          if (((n = n || '#AppstleCustomerPortal'), document.querySelector(n)))
            return jQuery
              .get(
                '/'.concat(
                  null === (e = RSConfig) || void 0 === e
                    ? void 0
                    : e.manageSubscriptionUrl,
                  '?renderType=html',
                ),
              )
              .then(function (e) {
                jQuery(n).html(e),
                  document.dispatchEvent(
                    new Event('AppstleSubscription:CustomerPortal:Embedded'),
                  ),
                  window.dispatchEvent(
                    new Event('AppstleSubscription:CustomerPortal:Embedded'),
                  );
              })
              .catch(function (e) {
                return console.error('error', e);
              });
        }
        function appstleSubscriptionBabInit(e, n) {
          var t;
          if (((n = n || '#AppstleBabMain'), document.querySelector(n)))
            return jQuery
              .get(
                '/'
                  .concat(
                    null === (t = RSConfig) || void 0 === t
                      ? void 0
                      : t.manageSubscriptionUrl,
                    '/bb/',
                  )
                  .concat(e, '?renderType=html'),
              )
              .then(function (e) {
                jQuery(n).html(e),
                  document.dispatchEvent(
                    new Event('AppstleSubscription:Bab:Embedded'),
                  ),
                  window.dispatchEvent(
                    new Event('AppstleSubscription:Bab:Embedded'),
                  );
              })
              .catch(function (e) {
                return console.error('error', e);
              });
        }
        function fetchAddJsSellingPlanInterCeptor() {
          var b,
            u = window.fetch;
          jQuery.ajaxSetup({
            beforeSend: function (e, n) {
              if (
                (console.log(e),
                console.log(n.data),
                console.log(n.url),
                '/cart/add.js' === (null == n ? void 0 : n.url))
              ) {
                var t = $(
                  '.appstle_sub_widget input[name=selling_plan]:checked',
                ).val();
                t && (n.data = n.data + '&selling_plan='.concat(t));
              }
            },
          }),
            (b = XMLHttpRequest.prototype.send),
            (XMLHttpRequest.prototype.send = function (n) {
              if (-1 !== this._url.indexOf('/cart/add')) {
                var e = null,
                  t = $(
                    '.appstle_sub_widget input[name=selling_plan]:checked',
                  ).val();
                if (t)
                  try {
                    if ('{' === n.substr(0, 1) && '}' === n.substr(-1)) {
                      var i;
                      e = JSON.parse(n);
                      var l = new URLSearchParams(window.location.search).get(
                          'variant',
                        ),
                        a = {};
                      if (
                        'Object' === getClassOf(e) &&
                        'Array' ==
                          getClassOf(
                            null === (i = e) || void 0 === i ? void 0 : i.items,
                          )
                      ) {
                        var o,
                          s,
                          r =
                            null === (o = e) || void 0 === o
                              ? void 0
                              : null === (s = o.items) || void 0 === s
                              ? void 0
                              : s.findIndex(function (e) {
                                  return e.id == l;
                                });
                        if (0 <= r) {
                          var p,
                            c,
                            d,
                            u =
                              null === (p = e) || void 0 === p
                                ? void 0
                                : null === (c = p.items) || void 0 === c
                                ? void 0
                                : c.filter(function (e) {
                                    return e.id != l;
                                  }),
                            g = JSON.parse(
                              JSON.stringify(
                                null === (d = e) || void 0 === d
                                  ? void 0
                                  : d.items[r],
                              ),
                            );
                          (g.selling_plan = $(
                            '.appstle_sub_widget input[name=selling_plan]:checked',
                          ).val()),
                            u.push(g),
                            (a.items = JSON.parse(JSON.stringify(u))),
                            b.call(this, JSON.stringify(a));
                        } else b.call(this, JSON.stringify(e));
                      } else
                        (e.selling_plan = t), b.call(this, JSON.stringify(e));
                    } else
                      '{' !== n.substr(0, 1) &&
                      '}' !== n.substr(-1) &&
                      -1 !== n.indexOf('&')
                        ? b.call(this, n + '&selling_plan='.concat(t))
                        : b.call(this, n);
                  } catch (e) {
                    b.call(this, n);
                  }
                else
                  try {
                    var f, _, v, y, m;
                    'FormData' === getClassOf(n)
                      ? (n.set(
                          'selling_plan',
                          $(
                            '.appstle_sub_widget input[name=selling_plan]:checked',
                          ).val() || '',
                        ),
                        b.call(this, n))
                      : '{' ===
                          (null === (f = n) || void 0 === f
                            ? void 0
                            : f.substr(0, 1)) &&
                        '}' ===
                          (null === (_ = n) || void 0 === _
                            ? void 0
                            : _.substr(-1))
                      ? (((e = JSON.parse(n)).selling_plan = ''),
                        b.call(this, JSON.stringify(e)))
                      : ('{' !==
                          (null === (v = n) || void 0 === v
                            ? void 0
                            : v.substr(0, 1)) &&
                          '}' !==
                            (null === (y = n) || void 0 === y
                              ? void 0
                              : y.substr(-1)) &&
                          -1 !==
                            (null === (m = n) || void 0 === m
                              ? void 0
                              : m.indexOf('&')) &&
                          (n = n.split(/&selling_plan=\d+/).join('')),
                        b.call(this, n));
                  } catch (e) {
                    b.call(this, n);
                  }
              } else b.call(this, n);
            }),
            (window.fetch = function () {
              var e = arguments[0],
                n = arguments[1];
              if (-1 === e.indexOf('/cart/add'))
                return u.apply(this, arguments);
              var t = new URLSearchParams(window.location.search).get(
                'variant',
              );
              if (
                'FormData' !== getClassOf(n.body) &&
                'Object' !== getClassOf(n.body)
              ) {
                if (!isJsonString(null == n ? void 0 : n.body)) {
                  var i = $(
                    '.appstle_sub_widget input[name=selling_plan]:checked',
                  ).val();
                  return (
                    i && (n.body = n.body + '&selling_plan=' + i),
                    u.apply(this, arguments)
                  );
                }
                var l = {},
                  a = JSON.parse(null == n ? void 0 : n.body);
                if (
                  'Object' === getClassOf(a) &&
                  'Array' == getClassOf(null == a ? void 0 : a.items)
                ) {
                  var o,
                    s =
                      null == a
                        ? void 0
                        : null === (o = a.items) || void 0 === o
                        ? void 0
                        : o.findIndex(function (e) {
                            return e.id == t;
                          });
                  if (0 <= s) {
                    var r,
                      p =
                        null == a
                          ? void 0
                          : null === (r = a.items) || void 0 === r
                          ? void 0
                          : r.filter(function (e) {
                              return e.id != t;
                            }),
                      c = JSON.parse(
                        JSON.stringify(null == a ? void 0 : a.items[s]),
                      );
                    return (
                      (c.selling_plan = $(
                        '.appstle_sub_widget input[name=selling_plan]:checked',
                      ).val()),
                      p.push(c),
                      (l.items = JSON.parse(JSON.stringify(p))),
                      (n.body = JSON.stringify(l)),
                      u.apply(this, arguments)
                    );
                  }
                  return u.apply(this, arguments);
                }
                if ('Object' === getClassOf(a)) {
                  var d = JSON.parse(null == n ? void 0 : n.body);
                  return (
                    (d.selling_plan = $(
                      '.appstle_sub_widget input[name=selling_plan]:checked',
                    ).val()),
                    (n.body = JSON.stringify(d)),
                    u.apply(this, arguments)
                  );
                }
              } else if ('FormData' === getClassOf(n.body))
                return (
                  n.body.set(
                    'selling_plan',
                    $(
                      '.appstle_sub_widget input[name=selling_plan]:checked',
                    ).val() || '',
                  ),
                  u.apply(this, arguments)
                );
            });
        }
        function isJsonString(e) {
          try {
            JSON.parse(e);
          } catch (e) {
            return !1;
          }
          return !0;
        }
        function getClassOf(e) {
          return Object.prototype.toString.call(e).slice(8, -1);
        }
        function dispatchAppstleEvent(e) {
          document.dispatchEvent(
            new Event('AppstleSubscription:SubscriptionWidget:'.concat(e)),
          ),
            window.dispatchEvent(
              new Event('AppstleSubscription:SubscriptionWidget:'.concat(e)),
            );
        }
        function urlParamsToObject(e) {
          for (
            var n,
              t =
                (null == e
                  ? void 0
                  : null === (n = e.substr(1)) || void 0 === n
                  ? void 0
                  : n.split('&')) || location.search.substr(1).split('&'),
              i = {},
              l = 0;
            l < t.length;
            l++
          ) {
            var a = t[l].split('=');
            i[a[0]] = a[1];
          }
          return i;
        }
        function urlParam(e, n) {
          return urlParamsToObject(n)[e] || null;
        }
        function attachMutationObserver(e, n) {
          var t = document.querySelector(e),
            i = { attributes: !0, childList: !0, subtree: !0 },
            l = new MutationObserver(n);
          t && i && l.observe(t, i);
        }
        if (
          (observer.observe(targetNode, config),
          (window.appstleSubscriptionCustomerPortalInit =
            appstleSubscriptionCustomerPortalInit),
          (window.appstleSubscriptionBabInit = appstleSubscriptionBabInit),
          appstleSubscriptionCustomerPortalInit(),
          document.dispatchEvent(
            new Event('AppstleSubscription:CustomerPortal:ReadyToEmbed'),
          ),
          window.dispatchEvent(
            new Event('AppstleSubscription:CustomerPortal:ReadyToEmbed'),
          ),
          (1 ===
            (null === (_jQuery2 = jQuery('.appstle_stand_alone_selector')) ||
            void 0 === _jQuery2
              ? void 0
              : _jQuery2.length) ||
            !0 === urlIsProductPage()) &&
            'true' ===
              (null === (_window28 = window) || void 0 === _window28
                ? void 0
                : null === (_window28$RS = _window28.RS) ||
                  void 0 === _window28$RS
                ? void 0
                : null === (_window28$RS$Config = _window28$RS.Config) ||
                  void 0 === _window28$RS$Config
                ? void 0
                : _window28$RS$Config.enableAddJSInterceptor))
        ) {
          var isSellingPlanPresent = !1;
          jQuery.each(RSConfig.product.selling_plan_groups, function (e, n) {
            'appstle' === n.app_id && (isSellingPlanPresent = !0);
          }),
            isSellingPlanPresent && fetchAddJsSellingPlanInterCeptor();
        }
        function detectSwapAction() {
          'swap' == urlParam('action') &&
            (attatchHandlerToSwapButtons(),
            addSwapButton(),
            attachMutationObserver('main', function () {
              return addSwapButton();
            }),
            jQuery(
              '<style>.appstle-swap-product .appstle-swap-product-loader, .appstle-swap-product .appstle-swap-product-success, .appstle-swap-product .appstle-swap-product-error,\n              .appstle-swap-product.inProgress .appstle-swap-product-text, .appstle-swap-product.inProgress .appstle-swap-product-success, .appstle-swap-product.inProgress .appstle-swap-product-error,\n              .appstle-swap-product.success .appstle-swap-product-text, .appstle-swap-product.success .appstle-swap-product-loader, .appstle-swap-product.success .appstle-swap-product-error ,\n              .appstle-swap-product.error .appstle-swap-product-text, .appstle-swap-product.error .appstle-swap-product-success, .appstle-swap-product.error .appstle-swap-product-loader {\n                display: none;\n              }\n\n              .appstle-swap-product .appstle-swap-product-text,\n              .appstle-swap-product.inProgress .appstle-swap-product-loader,\n              .appstle-swap-product.success .appstle-swap-product-success,\n              .appstle-swap-product.error .appstle-swap-product-error {\n                display: block;\n              }</style>',
            ).appendTo('head'));
        }
        function addSwapButton(e) {
          $(e || '.product-block:not(.sold-out) ').each(function (e, n) {
            $(n).find('.appstle-swap-product').length ||
              $(n).append(
                '<button class="appstle-swap-product"><span class="appstle-swap-product-text">SWAP</span><span class="appstle-swap-product-loader">Swapping</span><span class="appstle-swap-product-success">Swapped</span><span class="appstle-swap-product-error">Error</span></button>',
              );
          });
        }
        function attatchHandlerToSwapButtons() {
          $(document).on('click', '.appstle-swap-product', function () {
            var n = $(this);
            n.addClass('inProgress');
            var e = getTargetVariantId(this),
              t = urlParam('lineId'),
              i = urlParam('contractId'),
              l =
                '/apps/subscriptions/cp/api/subscription-contract-details/replace-variants-v2?contractId='
                  .concat(i, '&newVariantId=')
                  .concat(e, '&quantity=', '1', '&oldLineId=')
                  .concat(t);
            fetch(l, { method: 'POST' })
              .then(function (e) {
                n.removeClass('inProgress'),
                  e.ok
                    ? (n.addClass('success'), (location.href = '/account'))
                    : n.addClass('error'),
                  setTimeout(function () {
                    return resetButton(n);
                  }, 2500);
              })
              .catch(function (e) {
                n.removeClass('inProgress'),
                  n.addClass('error'),
                  setTimeout(function () {
                    return resetButton(n);
                  }, 2500);
              });
          });
        }
        function resetButton(e) {
          e.removeClass('inProgress'),
            e.removeClass('success'),
            e.removeClass('error');
        }
        function getTargetVariantId(e) {
          var n = $(e),
            t = null;
          if (!t) {
            var i = n.parent().find('a').attr('href'),
              l = new URL(location.origin + i);
            t = urlParam('variant', null == l ? void 0 : l.search);
          }
          return t;
        }
        detectSwapAction(),
          (window.appstleAddToCart = function (e) {
            var n = jQuery(e).parents('form')[0],
              t = { items: [Object.fromEntries(new FormData(n))] },
              i = jQuery(e).find('[data-add-to-cart-text]'),
              l = jQuery(e).find('[data-loader]');
            i.hide(),
              l.show(),
              fetch(window.Shopify.routes.root + 'cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(t),
              })
                .then(function (e) {
                  e.ok
                    ? (window.location.href = '/cart')
                    : (i.show(), l.hide());
                })
                .catch(function (e) {
                  i.show(), l.hide();
                });
          }),
          'true' ===
            (null === (_window29 = window) || void 0 === _window29
              ? void 0
              : null === (_window29$RS = _window29.RS) ||
                void 0 === _window29$RS
              ? void 0
              : null === (_window29$RS$Config = _window29$RS.Config) ||
                void 0 === _window29$RS$Config
              ? void 0
              : _window29$RS$Config.enableCartWidgetFeature) &&
            null !== (_window30 = window) &&
            void 0 !== _window30 &&
            null !== (_window30$RS = _window30.RS) &&
            void 0 !== _window30$RS &&
            null !== (_window30$RS$Config = _window30$RS.Config) &&
            void 0 !== _window30$RS$Config &&
            _window30$RS$Config.selectors.cartRowSelector &&
            jQuery(
              null === (_window31 = window) || void 0 === _window31
                ? void 0
                : null === (_window31$RS = _window31.RS) ||
                  void 0 === _window31$RS
                ? void 0
                : null === (_window31$RS$Config = _window31$RS.Config) ||
                  void 0 === _window31$RS$Config
                ? void 0
                : _window31$RS$Config.selectors.cartRowSelector,
            ).length &&
            (function () {
              var e,
                n,
                t,
                i,
                l,
                a,
                o,
                s,
                r,
                p,
                c,
                d,
                u,
                g,
                f,
                _,
                v,
                y,
                m,
                b,
                w,
                h,
                S,
                P =
                  null === (e = window) || void 0 === e
                    ? void 0
                    : null === (n = e.RS) || void 0 === n
                    ? void 0
                    : null === (t = n.Config) || void 0 === t
                    ? void 0
                    : t.selectors.cartRowSelector,
                C =
                  null === (i = window) || void 0 === i
                    ? void 0
                    : null === (l = i.RS) || void 0 === l
                    ? void 0
                    : null === (a = l.Config) || void 0 === a
                    ? void 0
                    : a.selectors.cartLineItemSelector,
                x = '[data-appstle-selector]',
                T =
                  null === (o = window) || void 0 === o
                    ? void 0
                    : null === (s = o.RS) || void 0 === s
                    ? void 0
                    : null === (r = s.Config) || void 0 === r
                    ? void 0
                    : r.selectors.cartLineItemPerQuantityPriceSelector,
                R =
                  null === (p = window) || void 0 === p
                    ? void 0
                    : null === (c = p.RS) || void 0 === c
                    ? void 0
                    : null === (d = c.Config) || void 0 === d
                    ? void 0
                    : d.selectors.cartLineItemTotalPriceSelector,
                j =
                  null === (u = window) || void 0 === u
                    ? void 0
                    : null === (g = u.RS) || void 0 === g
                    ? void 0
                    : null === (f = g.Config) || void 0 === f
                    ? void 0
                    : f.selectors.cartLineItemSellingPlanNameSelector,
                I =
                  null === (_ = window) || void 0 === _
                    ? void 0
                    : null === (v = _.RS) || void 0 === v
                    ? void 0
                    : null === (y = v.Config) || void 0 === y
                    ? void 0
                    : y.selectors.cartSubTotalSelector,
                Q =
                  null === (m = window) || void 0 === m
                    ? void 0
                    : null === (b = m.RS) || void 0 === b
                    ? void 0
                    : null === (w = b.Config) || void 0 === w
                    ? void 0
                    : w.selectors.cartLineItemPriceSelector,
                O = !1,
                D = JSON.parse(RS.Config.labels),
                F = '',
                k = !1;
              function q() {
                jQuery('#appstle_overlay').length || V(),
                  jQuery('.appstle_subscription_cart_wrapper select').each(
                    function (e, n) {
                      jQuery(n).off();
                    },
                  ),
                  jQuery('.appstle_subscribe_selected input').each(function (
                    e,
                    n,
                  ) {
                    jQuery(n).off();
                  }),
                  jQuery('.appstle_subscribe_title').each(function (e, n) {
                    jQuery(n).off();
                  }),
                  jQuery('.appstle_selected_frequency').each(function (e, n) {
                    jQuery(n).off();
                  }),
                  fetch('/cart.js')
                    .then(function (e) {
                      return e.json();
                    })
                    .then(function (_) {
                      var e,
                        n,
                        t,
                        i,
                        l,
                        a,
                        o = [],
                        v = [];
                      function s() {
                        if (O) {
                          jQuery('.appstle-cartItem-wrapper').length &&
                            jQuery('.appstle-cartItem-wrapper').remove();
                          var e =
                            '<div class="appstle-cartItem-wrapper">\n            <span class="appstle-combined-cart-widget-text">Frequency</span>\n            <select class="appstle-combined-cart-widget-select"><option value="">'.concat(
                              D[
                                'appstle.subscription.wg.selectDeliverOptionV2'
                              ] || 'Select Delivery Option',
                              '</option></select>\n            </div>',
                            );
                          jQuery(e).insertBefore('#shipping-calculator'),
                            jQuery('.appstle_progress-wrapper').length ||
                              jQuery(
                                '<div class="appstle_progress-wrapper">\n              <p class="appstle_progress_title"></p>\n              <div class="appstle_progress">\n                <div class="appstle_progress_bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>\n              </div>\n            </div>',
                              ).insertBefore('.item-wrap.cart-item-wrap'),
                            r(),
                            jQuery('.appstle-cartItem-wrapper')
                              .find('select')
                              .on('change', function (e) {
                                !(function n(t, i, l, a) {
                                  var e, o;
                                  if (l) {
                                    'appstle_unsubscribe' === l && (a = !0),
                                      V(),
                                      (i = t.shift());
                                    var s = {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify({
                                        id:
                                          null === (e = i) || void 0 === e
                                            ? void 0
                                            : e.key,
                                        quantity:
                                          (null === (o = i) || void 0 === o
                                            ? void 0
                                            : o.quantity) || 1,
                                        selling_plan: a ? '' : l,
                                      }),
                                    };
                                    fetch(
                                      '/cart/change.js?appstleUpdateAllLineItems=true',
                                      s,
                                    )
                                      .then(function (e) {
                                        return e.json();
                                      })
                                      .then(function (e) {
                                        setTimeout(function () {
                                          null != t && t.length
                                            ? n(t, i, l, a)
                                            : q();
                                        }, 200);
                                      })
                                      .catch(function (e) {
                                        return console.error(e);
                                      });
                                  }
                                })(
                                  null == _ ? void 0 : _.items,
                                  null,
                                  e.target.value,
                                  !1,
                                );
                              });
                        }
                        _.items.forEach(function (n, e) {
                          var t,
                            i,
                            l,
                            a,
                            o,
                            s = v
                              .filter(function (e) {
                                return e.handle === n.handle;
                              })
                              .pop(),
                            r =
                              ((l = JSON.parse(JSON.stringify(s))),
                              (a = null == n ? void 0 : n.variant_id),
                              !!(
                                (o = (
                                  null == l
                                    ? void 0
                                    : l.variants.filter(function (e) {
                                        return e.id === a;
                                      })
                                ).pop()) &&
                                null != o &&
                                o.selling_plan_allocations &&
                                null != o &&
                                o.selling_plan_allocations.length
                              )),
                            p =
                              null == n
                                ? void 0
                                : null === (t = n.selling_plan_allocation) ||
                                  void 0 === t
                                ? void 0
                                : null === (i = t.selling_plan) || void 0 === i
                                ? void 0
                                : i.id;
                          if (r) {
                            var c = jQuery(
                              '<div class="appstle_subscription_cart_wrapper">\n                  <div class="appstle_subscribe_title">\n                      <input type="checkbox"></input>\n                      <span class="appstle_discount_text"><span class="appstle_highest_discount">'
                                .concat(
                                  D[
                                    'appstle.subscription.wg.subscribeAndSaveInitalV2'
                                  ],
                                  '</span></span>\n                  </div>\n                  <div class="appstle_subscribe_selected_wrapper" style="display: none;">\n                      <div class="appstle_subscribe_selected">\n                        <input type="checkbox" checked ',
                                )
                                .concat(
                                  null != s && s.requires_selling_plan
                                    ? 'disabled'
                                    : '',
                                  '></input>\n                        <div class="appstle_subscribe_selected_text">',
                                )
                                .concat(
                                  D[
                                    'appstle.subscription.wg.subscribeAndSaveSuccessV2'
                                  ],
                                  '</div>\n                      </div>\n                      <div class="appstle_selected_frequency">\n                          <span class="appstle_deliveryText">{{deliveryText}}</span>&nbsp;\n                          <span class="appstle_applied_sellingPlanName">{{appliedSellingPlanName}}</span>\n                          <p class="appstle_applied_discountText"></p>\n                      </div>\n                  </div>\n                  <div class="appstle_radio_section" style="display: none">\n\n                      <select id="appstle_selling_plan_cart" data-product-select-id="',
                                )
                                .concat(JSON.parse(JSON.stringify(s)).id, '-')
                                .concat(p, '" class="appstle_select_cart" ')
                                .concat(
                                  k ? 'style="display: none !important;"' : '',
                                  '></select>\n                      ',
                                )
                                .concat(
                                  k
                                    ? '<div class="appstle-cart-custom-select-wrapper" data-product-custom-select-id="'
                                        .concat(
                                          JSON.parse(JSON.stringify(s)).id,
                                          '-',
                                        )
                                        .concat(
                                          p,
                                          '">\n                    <div class="select_wrap">\n                      <ul class="default_option">\n                        <div class="icon">\n                          <ion-icon name="chevron-down-outline"></ion-icon>\n                        </div>\n                      </ul>\n                      <ul class="select_ul"></ul>\n                    </div>\n                  </div>',
                                        )
                                    : '',
                                  '\n                  </div>\n              </div>',
                                ),
                            );
                            !(function (e, s, r, p) {
                              var n,
                                t,
                                i,
                                l,
                                a,
                                o,
                                c,
                                d,
                                u = [];
                              if (
                                (jQuery.each(
                                  e.selling_plan_groups,
                                  function (e, n) {
                                    'appstle' === n.app_id &&
                                      jQuery.each(
                                        n.selling_plans,
                                        function (e, n) {
                                          if (
                                            (function (e) {
                                              var n,
                                                t =
                                                  null === (n = RSConfig) ||
                                                  void 0 === n
                                                    ? void 0
                                                    : n.customerId,
                                                i =
                                                  RSConfig.customer_tags || [],
                                                l = !0;
                                              if (
                                                (!t &&
                                                  RSConfig.memberOnlySellingPlansJson &&
                                                  RSConfig
                                                    .memberOnlySellingPlansJson[
                                                    e
                                                  ] &&
                                                  RSConfig
                                                    .memberOnlySellingPlansJson[
                                                    e
                                                  ].enableMemberInclusiveTag &&
                                                  (l = !1),
                                                t &&
                                                  RSConfig.nonMemberOnlySellingPlansJson &&
                                                  RSConfig
                                                    .nonMemberOnlySellingPlansJson[
                                                    e
                                                  ] &&
                                                  (l = !1),
                                                l &&
                                                  t &&
                                                  RSConfig.memberOnlySellingPlansJson &&
                                                  RSConfig
                                                    .memberOnlySellingPlansJson[
                                                    e
                                                  ])
                                              ) {
                                                if (
                                                  RSConfig
                                                    .memberOnlySellingPlansJson[
                                                    e
                                                  ].memberInclusiveTags &&
                                                  RSConfig.memberOnlySellingPlansJson[
                                                    e
                                                  ].memberInclusiveTags.trim()
                                                ) {
                                                  var a =
                                                      RSConfig.memberOnlySellingPlansJson[
                                                        e
                                                      ].memberInclusiveTags.split(
                                                        ',',
                                                      ),
                                                    o = J(i, a);
                                                  l = 0 < o.length;
                                                }
                                                if (
                                                  RSConfig
                                                    .memberOnlySellingPlansJson[
                                                    e
                                                  ].memberExclusiveTags &&
                                                  RSConfig.memberOnlySellingPlansJson[
                                                    e
                                                  ].memberExclusiveTags.trim()
                                                ) {
                                                  var s =
                                                      RSConfig.memberOnlySellingPlansJson[
                                                        e
                                                      ].memberExclusiveTags.split(
                                                        ',',
                                                      ),
                                                    r = J(i, s);
                                                  l = !(0 < r.length);
                                                }
                                              }
                                              return l;
                                            })(n.id)
                                          ) {
                                            var t =
                                              p.selling_plan_allocations.find(
                                                function (e) {
                                                  return (
                                                    e.selling_plan_id === n.id
                                                  );
                                                },
                                              );
                                            if (!t) return;
                                            var i = t.per_delivery_price,
                                              l = formatPrice(
                                                null == t ? void 0 : t.price,
                                              ),
                                              a = formatPrice(i),
                                              o = null,
                                              s = null;
                                            s =
                                              t &&
                                              t.price_adjustments &&
                                              2 === t.price_adjustments.length
                                                ? formatPrice(
                                                    (o =
                                                      t.price_adjustments[1]
                                                        .price),
                                                  )
                                                : ((o = i), a);
                                            var r = n.price_adjustments.shift();
                                            u.push({
                                              name: n.name,
                                              id: n.id,
                                              formattedPrice: a,
                                              price: i,
                                              totalPrice: l,
                                              secondPrice: o,
                                              secondFormattedPrice: s,
                                              discount: r
                                                ? 'percentage' === r.value_type
                                                  ? ''.concat(r.value, '%')
                                                  : formatPrice(r.value)
                                                : '',
                                              deliveryText: n.options[0].name,
                                            });
                                          }
                                        },
                                      );
                                  },
                                ),
                                0 < u.length)
                              ) {
                                u.sort(function (e, n) {
                                  return e.price - n.price;
                                }),
                                  jQuery('<option />', {
                                    html:
                                      D[
                                        'appstle.subscription.wg.selectDeliverOptionV2'
                                      ] || 'Select Delivery Option',
                                    value: '',
                                  }).appendTo(s.find('select')),
                                  k &&
                                    (jQuery(
                                      '<li class="'
                                        .concat(
                                          r ? '' : 'active',
                                          '" value="">\n          <div class="option">\n            <p>',
                                        )
                                        .concat(
                                          D[
                                            'appstle.subscription.wg.selectDeliverOptionV2'
                                          ] || 'Select Delivery Option',
                                          '</p>\n          </div>\n        </li>',
                                        ),
                                    ).appendTo(
                                      s.find(
                                        '.appstle-cart-custom-select-wrapper .select_ul',
                                      ),
                                    ),
                                    jQuery(
                                      '<li data-selected-selling-plan="">\n                  <div class="option">\n                    <p>'.concat(
                                        D[
                                          'appstle.subscription.wg.selectDeliverOptionV2'
                                        ] || 'Select Delivery Option',
                                        '</p>\n                  </div>\n                </li>',
                                      ),
                                    ).appendTo(
                                      s.find(
                                        '.appstle-cart-custom-select-wrapper .default_option',
                                      ),
                                    )),
                                  jQuery(u).each(function (e, n) {
                                    var t,
                                      i,
                                      l =
                                        ((i =
                                          (t = n).totalPrice == t.formattedPrice
                                            ? {
                                                sellingPlanName: t.name,
                                                sellingPlanPrice:
                                                  '<span class="transcy-money">'.concat(
                                                    t.formattedPrice,
                                                    '</span>',
                                                  ),
                                                secondSellingPlanPrice:
                                                  '<span class="transcy-money">'.concat(
                                                    t.secondFormattedPrice,
                                                    '</span>',
                                                  ),
                                              }
                                            : {
                                                sellingPlanName: t.name,
                                                totalPrice:
                                                  '<span class="transcy-money">'.concat(
                                                    null == t
                                                      ? void 0
                                                      : t.totalPrice,
                                                    '</span>',
                                                  ),
                                                sellingPlanPrice:
                                                  '<span class="transcy-money">'.concat(
                                                    t.formattedPrice,
                                                    '</span>',
                                                  ),
                                                secondSellingPlanPrice:
                                                  '<span class="transcy-money">'.concat(
                                                    t.secondFormattedPrice,
                                                    '</span>',
                                                  ),
                                              }),
                                        wrapPriceWithSpanTag(
                                          Mustache.render(
                                            RS.Config.sellingPlanTitleText,
                                            i,
                                          ),
                                        ));
                                    o(s.find('select'));
                                    var a = jQuery(
                                      '.appstle-cartItem-wrapper select',
                                    );
                                    function o(e) {
                                      jQuery('<option />', {
                                        value: n.id,
                                        html: l,
                                        selected:
                                          r === (null == n ? void 0 : n.id),
                                      }).appendTo(jQuery(e));
                                    }
                                    O &&
                                      null != a &&
                                      a.length &&
                                      !a.find('option[value='.concat(n.id, ']'))
                                        .length &&
                                      o(a),
                                      k &&
                                        (jQuery(
                                          '<li class="'
                                            .concat(
                                              r === (null == n ? void 0 : n.id)
                                                ? 'active'
                                                : '',
                                              '" value="',
                                            )
                                            .concat(
                                              n.id,
                                              '">\n          <div class="option">\n            <p>',
                                            )
                                            .concat(
                                              l,
                                              '</p>\n          </div>\n        </li>',
                                            ),
                                        ).appendTo(
                                          s.find(
                                            '.appstle-cart-custom-select-wrapper .select_ul',
                                          ),
                                        ),
                                        r === (null == n ? void 0 : n.id) &&
                                          jQuery(s)
                                            .find(
                                              '.appstle-cart-custom-select-wrapper .default_option [data-selected-selling-plan] p',
                                            )
                                            .html(l));
                                  }),
                                  (null != e && e.requires_selling_plan) ||
                                    jQuery('<option />', {
                                      value: 'appstle_unsubscribe',
                                      html:
                                        D[
                                          'appstle.subscription.wg.unsubscribeFrequencyTextV2'
                                        ] || 'Unsubscribe',
                                    }).appendTo(s.find('select'));
                                var g = u
                                  .filter(function (e) {
                                    return (null == e ? void 0 : e.id) === r;
                                  })
                                  .pop();
                                if (g) {
                                  var f = s
                                    .find(
                                      '.appstle_selected_frequency .appstle_deliveryText',
                                    )
                                    .text()
                                    .split('{{deliveryText}}')
                                    .join(
                                      D[
                                        'appstle.subscription.wg.deliveryEveryFrequencyTextV2'
                                      ] || '',
                                    );
                                  s.find('.appstle_deliveryText').html(f);
                                  var _ = s
                                    .find(
                                      '.appstle_selected_frequency .appstle_applied_sellingPlanName',
                                    )
                                    .text()
                                    .split('{{appliedSellingPlanName}}')
                                    .join(g.name);
                                  s.find(
                                    '.appstle_applied_sellingPlanName',
                                  ).html(_);
                                  var v = s
                                    .find('.appstle_subscribe_selected_text')
                                    .text()
                                    .split('{{{discountValue}}}')
                                    .join(g.discount);
                                  s
                                    .find('.appstle_subscribe_selected_text')
                                    .html(v),
                                    (n = g.id),
                                    (t = s),
                                    (c =
                                      null === (i = RSConfig) || void 0 === i
                                        ? void 0
                                        : null === (l = i.sellingPlansJson) ||
                                          void 0 === l
                                        ? void 0
                                        : l.find(function (e) {
                                            return (
                                              (null == e
                                                ? void 0
                                                : e.id.split('/').pop()) ===
                                              String(n)
                                            );
                                          })),
                                    (d = []),
                                    null != c &&
                                      null !== (a = c.appstleCycles) &&
                                      void 0 !== a &&
                                      a.length &&
                                      (null == c ||
                                        null === (o = c.appstleCycles) ||
                                        void 0 === o ||
                                        o.forEach(function (e) {
                                          d.push(
                                            null == e
                                              ? void 0
                                              : e.freeProductHandle,
                                          );
                                        })),
                                    (function n(t, i, l) {
                                      var e,
                                        a,
                                        o = t.shift();
                                      return null !== (e = window) &&
                                        void 0 !== e &&
                                        null !== (a = e.products) &&
                                        void 0 !== a &&
                                        a[o]
                                        ? t.length
                                          ? n(t, i, l)
                                          : N(i, l)
                                        : fetch('/products/'.concat(o, '.js'))
                                            .then(function (e) {
                                              if (e.ok) return e.json();
                                            })
                                            .then(function (e) {
                                              return (
                                                window.products ||
                                                  (window.products = {}),
                                                (window.products[o] = e),
                                                t.length ? n(t, i, l) : N(i, l)
                                              );
                                            });
                                    })(d, n, t);
                                } else {
                                  var y = s
                                    .find('.appstle_highest_discount')
                                    .text()
                                    .split('{{{discountValue}}}')
                                    .join(u[0].discount);
                                  s.find('.appstle_highest_discount').html(y);
                                }
                              }
                            })(
                              JSON.parse(JSON.stringify(s)),
                              c,
                              p,
                              JSON.parse(
                                JSON.stringify(
                                  s.variants
                                    .filter(function (e) {
                                      return e.id === n.id;
                                    })
                                    .pop(),
                                ),
                              ),
                            ),
                              jQuery(c)
                                .find('select')
                                .on('change', function (e) {
                                  B(
                                    null == _ ? void 0 : _.items,
                                    n,
                                    s.id,
                                    e.target.value,
                                    !1,
                                  );
                                }),
                              jQuery(c)
                                .find('.appstle_subscribe_selected input')
                                .on('change', function (e) {
                                  B(
                                    null == _ ? void 0 : _.items,
                                    n,
                                    s.id,
                                    'unsubscribe',
                                    !0,
                                  );
                                }),
                              jQuery(c)
                                .find(
                                  '.appstle_subscribe_title, .appstle_selected_frequency',
                                )
                                .on('click', function () {
                                  k
                                    ? ($(this)
                                        .parents(
                                          '.appstle_subscription_cart_wrapper',
                                        )
                                        .find('.appstle_radio_section')
                                        .toggle(),
                                      $(this).find('input[type=checkbox]')
                                        .length &&
                                        ($(this)
                                          .find('input[type=checkbox]')
                                          .is(':checked')
                                          ? ($(this)
                                              .find('input[type=checkbox]')
                                              .prop('checked', !0),
                                            $(this)
                                              .parents(
                                                '.appstle_subscription_cart_wrapper',
                                              )
                                              .find('.appstle_radio_section')
                                              .show())
                                          : ($(this)
                                              .find('input[type=checkbox]')
                                              .prop('checked', !1),
                                            $(this)
                                              .parents(
                                                '.appstle_subscription_cart_wrapper',
                                              )
                                              .find('.appstle_radio_section')
                                              .hide())))
                                    : (1 ===
                                      jQuery(c).find(
                                        'select option.sellingPlanOption',
                                      ).length
                                        ? (jQuery(c)
                                            .find('select')
                                            .val(
                                              jQuery(c)
                                                .find(
                                                  'select option.sellingPlanOption',
                                                )
                                                .attr('value'),
                                            ),
                                          jQuery(c)
                                            .find('select')
                                            .trigger('change'))
                                        : $(this)
                                            .parents(
                                              '.appstle_subscription_cart_wrapper',
                                            )
                                            .find('.appstle_radio_section')
                                            .show(),
                                      jQuery(this).hide());
                                });
                            var d,
                              u,
                              g = jQuery(jQuery(P)[e]);
                            if (
                              (p
                                ? (c.find('.appstle_subscribe_title').hide(),
                                  c
                                    .find('.appstle_subscribe_selected_wrapper')
                                    .show(),
                                  k && c.find('.appstle_radio_section').show(),
                                  g
                                    .find(j)
                                    .text(
                                      null == n
                                        ? void 0
                                        : null ===
                                            (d = n.selling_plan_allocation) ||
                                          void 0 === d
                                        ? void 0
                                        : null === (u = d.selling_plan) ||
                                          void 0 === u
                                        ? void 0
                                        : u.name,
                                    ),
                                  O ? g.find(j).show() : g.find(j).hide())
                                : g.find(j).hide(),
                              g
                                .find('.appstle_subscription_cart_wrapper')
                                .remove(),
                              1 === g.find(C).length
                                ? c.insertBefore(g.find(C))
                                : c.insertBefore(g.find(x)),
                              g.find(T).html(formatPrice(n.final_price)),
                              g.find(R).html(formatPrice(n.final_line_price)),
                              p && n.selling_plan_allocation.compare_at_price)
                            ) {
                              g.find(Q).html('');
                              var f =
                                '<span class="appstle_cart_sellingPlan_price">'
                                  .concat(
                                    formatPrice(n.final_price),
                                    '</span><span  class="appstle_cart_compare_price">',
                                  )
                                  .concat(
                                    formatPrice(
                                      n.selling_plan_allocation
                                        .compare_at_price,
                                    ),
                                    '</span>',
                                  );
                              g.find(Q).html(f);
                            }
                          }
                          jQuery(jQuery(P)[e])
                            .find(C)
                            .addClass('appstleCartWidgetProcessed');
                        }),
                          O &&
                            (v.filter(function (e) {
                              return e.requires_selling_plan;
                            }).length ||
                              jQuery('<option />', {
                                value: 'appstle_unsubscribe',
                                html:
                                  D[
                                    'appstle.subscription.wg.unsubscribeFrequencyTextV2'
                                  ] || 'Unsubscribe',
                                class: 'sellingPlanOption',
                              }).appendTo(
                                jQuery('.appstle-cartItem-wrapper select'),
                              )),
                          jQuery(I).html(
                            formatPrice(null == _ ? void 0 : _.total_price),
                          ),
                          jQuery('#appstle_overlay').remove();
                      }
                      function r() {
                        var e = '';
                        (e =
                          (null == _ ? void 0 : _.total_price) < 9900
                            ? 'You are '.concat(
                                formatPrice(
                                  9900 - (null == _ ? void 0 : _.total_price),
                                ),
                                ' away from checkout.',
                              )
                            : 'Yay! you are eligible for checkout.'),
                          jQuery('.appstle_progress_title').text(e);
                        var n = 0;
                        (n =
                          (null == _ ? void 0 : _.total_price) < 9900
                            ? (100 * (null == _ ? void 0 : _.total_price)) /
                              9900
                            : 100),
                          jQuery('.appstle_progress_bar').css(
                            'width',
                            ''.concat(n, '%'),
                          ),
                          jQuery(
                            '.proceed-to-checkout, .proceed-to-checkout-error-text',
                          ).remove(),
                          100 === n
                            ? jQuery(
                                ' <div class="proceed-to-checkout appstle-proceed-to-checkout">\n                          <a href="/checkout" class= "btn-style1 center">Proceed to Checkout</a>\n                      </div>',
                              ).insertAfter('.cart-total')
                            : jQuery(
                                '<div class="proceed-to-checkout-error-text">please purcase atleast $99</div>',
                              ).insertAfter('.cart-total');
                      }
                      0 <
                      (null == _
                        ? void 0
                        : null === (e = _.items) || void 0 === e
                        ? void 0
                        : e.length)
                        ? ((null == _
                            ? void 0
                            : null === (n = _.items) || void 0 === n
                            ? void 0
                            : n.length) === jQuery(P).length
                            ? null == _ ||
                              _.items.forEach(function (e) {
                                -1 ===
                                  o.indexOf(null == e ? void 0 : e.handle) &&
                                  o.push(null == e ? void 0 : e.handle);
                              })
                            : null !== (t = window) &&
                              void 0 !== t &&
                              null !== (i = t.RS) &&
                              void 0 !== i &&
                              null !== (l = i.Config) &&
                              void 0 !== l &&
                              null !== (a = l.selectors) &&
                              void 0 !== a &&
                              a.cartRowSelector &&
                              null != P &&
                              P.length &&
                              jQuery(P).length &&
                              location.reload(),
                          (function n() {
                            if (o.length) {
                              var e = o.shift();
                              e
                                ? fetch('/products/'.concat(e, '.js'))
                                    .then(function (e) {
                                      return e.json();
                                    })
                                    .then(function (e) {
                                      v.push(e), n();
                                    })
                                : n();
                            } else
                              s(),
                                document.dispatchEvent(
                                  new Event(
                                    'AppstleSubscription:CartWidget:Updated',
                                  ),
                                ),
                                window.dispatchEvent(
                                  new Event(
                                    'AppstleSubscription:CartWidget:Updated',
                                  ),
                                );
                          })())
                        : jQuery('#appstle_overlay').remove();
                    });
              }
              if (-1 !== location.pathname.indexOf('/cart')) {
                var A = window.XMLHttpRequest.prototype.open;
                window.XMLHttpRequest.prototype.open = function () {
                  this.addEventListener('load', function () {
                    var e = this.responseURL;
                    console.log('origOpe.n -> url=' + e),
                      (-1 === e.indexOf('cart/change') &&
                        -1 === e.indexOf('cart/add')) ||
                        -1 !== e.indexOf('appstleUpdateAllLineItems=true') ||
                        (F !== JSON.stringify(this.response) &&
                          (jQuery('#appstle_overlay').length || V(),
                          setTimeout(q, 100),
                          (F = JSON.stringify(this.response))));
                  }),
                    A.apply(this, arguments);
                };
                var E = window.fetch;
                (window.fetch = function () {
                  var n = arguments,
                    i = this;
                  return new Promise(function (t, e) {
                    E.apply(i, n)
                      .then(function (e) {
                        var n = e.url;
                        (-1 === n.indexOf('cart/change') &&
                          -1 === n.indexOf('cart/add')) ||
                          -1 !== n.indexOf('appstleUpdateAllLineItems=true') ||
                          (jQuery('#appstle_overlay').length || V(),
                          setTimeout(q, 100)),
                          t(e);
                      })
                      .catch(function (e) {
                        console.error(e);
                      });
                  });
                }),
                  q(),
                  (S =
                    null === (h = RSConfig) || void 0 === h ? void 0 : h.css),
                  jQuery(
                    '<style>\n           .appstle-subsccribe-cart-discount{\n                 margin-left: 2px;\n           }\n\n          .appstle_cart_radio_selected .appstle_cart_selling_plan_dropdown{\n              display: block;\n          }\n      .appstle_cart_radio_selected {\n            background-color: #eee;\n           border-radius: 6px;\n      }\n      .appstle-cart-radio-label{\n        margin-left: 10px;\n      }\n      .appstle_subscription_cart_wrapper{\n        max-width: 100%;\n        justify-content: flex-start;\n        flex-direction: column;\n        font-size: 13px;\n      }\n        .appstle_cart_radio_label {\n          margin-left: 10px;\n          font-weight: bold;\n        }\n\n        .appstle_radio_section{\n        }\n        .appstle_subscribe_title {\n                cursor: pointer;\n                font-size: 13px;\n                display: flex;\n                align-items: center;\n                line-height: 1.5;\n                margin-bottom: 0.2rem;\n\n        }\n        .appstle_subscribe_title .appstle_highest_discount, .appstle_applied_sellingPlanName {\n                border-bottom: 1px solid currentColor;\n        }\n\n        .appstle_subscribe_title input {\n                margin-right: 5px;\n        }\n\n        .appstle_subscribe_selected {\n                display: flex;\n                align-items: center;\n                margin-bottom: 0.2rem;\n\n        }\n\n        .appstle_subscribe_selected input {\n                margin-right: 5px;\n        }\n\n        .appstle_selected_frequency  {\n               display: inline;\n               margin-bottom: 0.2rem;\n               cursor: pointer;\n        }\n\n        .appstle_selected_frequency .appstle_applied_sellingPlanName {\n                 border-bottom: 1px solid currentColor;\n        }\n\n        .appstle_highest_discount, .appstle_applied_sellingPlanName {\n                color: #198946;\n        }\n\n#appstle_overlay {\nwidth: 100%;\nheight: 100%;\nposition: fixed;\ntop: 0;\nleft: 0;\nbackground: rgba(0, 0, 0, 0.7);\nz-index: 999999;\ntext-align: center;\n}\n\n.appstle_loader {\nborder: 6px solid rgba(255, 255, 255, 0.2);\nposition: absolute;\nleft: 50%;\ntop: 50%;\nmargin-top: -36px;\nmargin-left: -36px;\nborder-top: 6px solid #fff;\nborder-radius: 50%;\nwidth: 60px;\nheight: 60px;\nanimation: appstle_loading_spin 0.7s linear infinite; }\n\n.appstle_loader_text {\nposition: absolute;\nleft: 50%;\ntop: calc(50% + 60px);\ntransform: translate(-50%, -50%);\ncolor: white;\n}\n\n.appstle_subscribe_selected input[type=checkbox] {\nheight: inherit;\n}\n\n.appstle_cart_compare_price {\ntext-decoration: line-through;\nfont-size: 13px;\nmargin-left: 5px;\nopacity: 0.85;\n}\n.appstle-loyalty-billing-cycle-count, .appstle-loyalty-discount-amount, .appstle-loyalty-free-trial-discount {\ncolor: #198946;\nfont-weight: bold;\n}\n\n\n.appstle-combined-cart-widget-select {\nwidth: 100%;\n}\n\n.appstle_progress-wrapper {\nmargin: 30px 0;\n}\n\n.appstle_progress {\ndisplay: flex;\nheight: 10px;\noverflow: hidden;\nline-height: 0;\nfont-size: 7.5px;\nbackground-color: #e9ecef;\nborder-radius: 2.5px;\n}\n\n.appstle_progress_bar {\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\noverflow: hidden;\ncolor: #fff;\ntext-align: center;\nwhite-space: nowrap;\nbackground-color: #4cb849;\ntransition: width .6s ease;\n}\n\n.appstle-cartItem-wrapper {\nmargin: 20px 0;\n}\n.appstle-proceed-to-checkout {\ntext-align: center;\nmargin: 15px 0;\n}\n\n\n@keyframes appstle_loading_spin {\n0% {\ntransform: rotate(0deg); }\n\n100% {\ntransform: rotate(360deg); } }\n\n@-webkit-keyframes spin {\n0% {\ntransform: rotate(0deg); }\n\n100% {\ntransform: rotate(360deg); } }\n\n'
                      .concat(
                        k
                          ? ".appstle_subscribe_title input:before, .appstle_subscribe_selected input:before {\ncontent: '';\nposition: absolute;\nwidth: 22px;\nheight: 22px;\nbackground: white;\nborder-radius: 50%;\ntransform: translate(-50%, -50%);\ntop: 50%;\nleft: 50%;\nborder: 1px solid #c2bfbf;\nopacity: 1;\n\n}\n.appstle_subscribe_title input:checked:before, .appstle_subscribe_selected input:checked:before {\nbackground: #000;\nborder: 1px solid #000;\nbackground-size: cover;\nbackground-image: url(https://ik.imagekit.io/mdclzmx6brh/checkmark-outline_sKMJp3BD0.svg?updatedAt=1688306310408);\n}\n\n.appstle_subscribe_title input, .appstle_subscribe_selected input {\nposition: relative;\n}\n\n.appstle_discount_text {\npadding-left: 30px !important;\n}\n\nbody td.cart-item__details {\nborder: none !important;\n}\n\n.appstle_selected_frequency {\ndisplay: none;\n}\n\n:root {\n--bg-clr: #8681ce;\n--white: #fff;\n--dd-list-hvr: #f6f6f7;\n--text-clr: #2c3e50;\n}\n\n.appstle-cart-custom-select-wrapper * {\nlist-style: none;\nmargin: 0;\npadding: 0;\nbox-sizing: border-box;\nlist-style: none;\nfont-family: 'Helvetica';\nfont-size: 12px;\ncolor: #000;\nfont-size: 12px;\nuser-select: none;\n}\n\n.appstle-cart-custom-select-wrapper .title {\nfont-size: 14px;\ncolor: var(--white);\n}\n\n.select_wrap {\n\nposition: relative;\n}\n\n.select_wrap .default_option {\nbackground: var(--white);\nborder-radius: 3px;\nposition: relative;\ncursor: pointer;\n}\n\n.select_wrap .default_option .icon {\nposition: absolute;\ntop: 50%;\nright: 20px;\nfont-size: 12px;\nheight: 12px;\ntransition: all 0.5s ease;\ntransform-origin: center;\nwidth: 12px;\ntransform: translateY(-50%);\nright: 6px;\n}\n\n.select_wrap .default_option li {\npadding: 12px 24px;\nfont-weight: 700;\n}\n\n.select_wrap .select_ul {\nposition: absolute;\ntop: 45px;\nleft: 0;\nwidth: 100%;\npadding: 10px;\nbackground: var(--white);\nborder-radius: 3px;\ndisplay: none;\nborder: 1px solid #c2bfbf;\nz-index: 1;\n}\n\n.select_wrap .select_ul li {\npadding: 10px 20px;\ncursor: pointer;\nborder-radius: 3px;\nmargin-bottom: 1px;\n}\n\n.select_wrap .select_ul li:last-child {\nmargin-bottom: 0;\n}\n\n.select_wrap .select_ul li:hover,\n.select_wrap .select_ul li.active {\nbackground: var(--dd-list-hvr);\n}\n\n.select_wrap .option {\ndisplay: flex;\nalign-items: center;\n}\n\n.select_wrap.active .select_ul {\ndisplay: block;\n}\n\n.select_wrap.active .default_option .icon {\ntop: 13px;\ntransform: rotate(180deg);\n}\n.appstle_subscription_cart_wrapper {\npadding: 0 !important;\n}\n.appstle_subscribe_title, .appstle_subscribe_selected {padding: 9px;}\n\n.select#appstle_selling_plan_cart {display: none !important;}\n.appstle-cart-custom-select-wrapper {border-top: 1px solid #c2bfbf;}\n.appstle_subscribe_title {margin-bottom: 0 !important;}\nul.default_option .option {\npadding-left: 22px;\n}\n\nul.default_option .option:before {\ncontent: \"\";\nposition: absolute;\nbackground: url(https://cdn.shopify.com/s/files/1/0727/4908/9081/files/Screenshot_4.png?v=1686315491);\nbackground-size: 100%;\nwidth: 40px;\nheight: 28px;\nleft: 0px;\nbackground-repeat: no-repeat;\n}\n\n.appstle_subscribe_selected_text {padding-left: 20px;}\n.appstle_subscription_cart_wrapper {\nborder: 1px solid #c2bfbf;\nborder-radius: 3px;\n}\n\n.appstle_subscribe_selected input[type=checkbox] {left: 4px;}\n.appstle_subscribe_title .appstle_highest_discount, .appstle_applied_sellingPlanName {border: none; color: currentColor;}\n.appstle_discount_text {\npadding-left: 18px !important;\n}"
                          : '',
                        '\n\n        </style>\n    <style>',
                      )
                      .concat(null == S ? void 0 : S.customCSS, '</style>'),
                  ).appendTo(jQuery('head'));
              }
              function V(e) {
                jQuery('#appstle_overlay').length ||
                  jQuery('body').append(
                    "<div id='appstle_overlay'><div class='appstle_loader'></div><div class='appstle_loader_text'>" +
                      (e || ' ') +
                      '</div></div></div>',
                  );
              }
              function L(e, n, t, i, l, a, o, s) {
                if (
                  JSON.parse(RS.Config.labels)[
                    'appstle.subscription.wg.loyaltyPerkDescriptionTextV2'
                  ]
                ) {
                  var r = {
                    discount: n,
                    discountType: t,
                    formatDiscountedPrice: formatPrice(100 * n),
                    freeProductName: a,
                    isDiscountTypePercentage: 'PERCENTAGE' === t,
                    isDiscountTypeFixedPrice: 'PRICE' === t,
                    isDiscountTypeShipping: 'SHIPPING' === t,
                    isDiscountTypeFreeProduct: 'FREE_PRODUCT' === t,
                    isFreeTrial: i,
                    isCartPage: !0,
                    featured_image: o,
                    productPrice: s,
                    billingCycleBlock:
                      '<span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'.concat(
                        e,
                        '</span>',
                      ),
                  };
                  return Mustache.render(
                    JSON.parse(RS.Config.labels)[
                      'appstle.subscription.wg.loyaltyPerkDescriptionTextV2'
                    ],
                    r,
                  );
                }
                return i
                  ? 'Get <span class="appstle-loyalty-free-trial-discount">'
                      .concat(
                        n,
                        ' <span class="appstle-loyalty-free-trial-discount-count" style="text-transform: lowercase;">',
                      )
                      .concat(t)
                      .concat(
                        1 < n ? 's' : '',
                        '</span></span> <span class="appstle-loyalty-free-trial-text">free trial.</span>',
                      )
                  : 'PERCENTAGE' === t
                  ? l
                    ? '<span class="appstle-loyalty-discount">Get <span class="appstle-loyalty-discount-amount">'
                        .concat(
                          n + '% off',
                          '</span></span><span class="appstle-loyalty-billing-cycle"> after <span class="appstle-loyalty-billing-cycle-count">',
                        )
                        .concat(e, '</span> recurring order</span>.')
                    : 'Thereafter <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                        .concat(
                          e,
                          '</span> recurring order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                        )
                        .concat(n + '% off', '</span></span>.')
                  : 'SHIPPING' === t
                  ? l
                    ? '<span class="appstle-loyalty-discount">Get <span class="appstle-loyalty-discount-amount">'.concat(
                        'shipping at '.concat(formatPrice(100 * n)),
                        '</span></span><span class="appstle-loyalty-billing-cycle"> after <span class="appstle-loyalty-billing-cycle-count">',
                        e,
                        '</span> recurring order</span>.',
                      )
                    : 'Thereafter <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'.concat(
                        e,
                        '</span> recurring order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                        'shipping at '.concat(formatPrice(100 * n)),
                        '</span></span>.',
                      )
                  : 'FREE_PRODUCT' === t
                  ? l
                    ? '<span class="appstle-loyalty-discount">Get a<span class="appstle-loyalty-discount-amount"> FREE PRODUCT ('
                        .concat(
                          a,
                          ')</span></span><span class="appstle-loyalty-billing-cycle"> after <span class="appstle-loyalty-billing-cycle-count">',
                        )
                        .concat(e, '</span> recurring order</span>.')
                    : 'Thereafter <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                        .concat(
                          e,
                          '</span> recurring order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">FREE PRODUCT (',
                        )
                        .concat(a, ')</span></span>.')
                  : 'FIXED' === t
                  ? l
                    ? '<span class="appstle-loyalty-discount">Get <span class="appstle-loyalty-discount-amount">'
                        .concat(
                          formatPrice(100 * n) + ' off',
                          '</span></span><span class="appstle-loyalty-billing-cycle"> after <span class="appstle-loyalty-billing-cycle-count">',
                        )
                        .concat(e, '</span> recurring order</span>.')
                    : 'Thereafter <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                        .concat(
                          e,
                          '</span> recurring order</span>, <span class="appstle-loyalty-discount">get <span class="appstle-loyalty-discount-amount">',
                        )
                        .concat(
                          formatPrice(100 * n) + ' off',
                          '</span></span>.',
                        )
                  : 'PRICE' === t
                  ? l
                    ? '<span class="appstle-loyalty-discount">Get at <span class="appstle-loyalty-discount-amount">'
                        .concat(
                          formatPrice(100 * n),
                          '</span></span><span class="appstle-loyalty-billing-cycle"> after <span class="appstle-loyalty-billing-cycle-count">',
                        )
                        .concat(e, '</span> recurring order</span>.')
                    : 'Thereafter <span class="appstle-loyalty-billing-cycle"><span class="appstle-loyalty-billing-cycle-count">'
                        .concat(
                          e,
                          '</span> recurring order</span>, <span class="appstle-loyalty-discount">get at <span class="appstle-loyalty-discount-amount">',
                        )
                        .concat(formatPrice(100 * n), '</span></span>.')
                  : void 0;
              }
              function N(n, e) {
                var t,
                  i,
                  l,
                  a,
                  h =
                    null === (t = RSConfig) || void 0 === t
                      ? void 0
                      : null === (i = t.sellingPlansJson) || void 0 === i
                      ? void 0
                      : i.find(function (e) {
                          return (
                            (null == e ? void 0 : e.id.split('/').pop()) ===
                            String(n)
                          );
                        }),
                  S = '';
                (null != h &&
                  h.freeTrialEnabled &&
                  (S = L(
                    0,
                    h.freeTrialCount,
                    h.freeTrialInterval,
                    null == h ? void 0 : h.freeTrialEnabled,
                    !0,
                  )),
                null != h &&
                  h.afterCycle2 &&
                  (S =
                    S +
                    ''.concat(null != h && h.freeTrialEnabled ? ' ' : '') +
                    L(
                      getBillingCycleText(h.afterCycle2),
                      h.discountOffer2,
                      h.discountType2,
                      !1,
                      !(null != h && h.freeTrialEnabled),
                    )),
                null == h ||
                  null === (l = h.appstleCycles) ||
                  void 0 === l ||
                  !l.length ||
                  (null != h && h.freeTrialEnabled)) ||
                  null == h ||
                  null === (a = h.appstleCycles) ||
                  void 0 === a ||
                  a.forEach(function (n, e) {
                    var t = '',
                      i = '',
                      l = '';
                    if (
                      'FREE_PRODUCT' === (null == n ? void 0 : n.discountType)
                    ) {
                      var a, o, s, r, p, c, d, u, g, f, _, v, y, m, b, w;
                      if (
                        ((t =
                          null === (a = window) || void 0 === a
                            ? void 0
                            : null === (o = a.products) || void 0 === o
                            ? void 0
                            : null === (s = o[n.freeProductHandle]) ||
                              void 0 === s
                            ? void 0
                            : s.title),
                        1 <
                          (null === (r = window) || void 0 === r
                            ? void 0
                            : null === (p = r.products) || void 0 === p
                            ? void 0
                            : null ===
                                (c =
                                  p[
                                    null == n ? void 0 : n.freeProductHandle
                                  ]) || void 0 === c
                            ? void 0
                            : c.variants.length))
                      )
                        t =
                          t +
                          ' - ' +
                          (null ===
                            (w = (
                              null === (y = window) || void 0 === y
                                ? void 0
                                : null === (m = y.products) || void 0 === m
                                ? void 0
                                : null ===
                                    (b =
                                      m[
                                        null == n ? void 0 : n.freeProductHandle
                                      ]) || void 0 === b
                                ? void 0
                                : b.variants.filter(function (e) {
                                    return (
                                      (null == e ? void 0 : e.id) ===
                                      parseInt(
                                        null == n ? void 0 : n.freeVariantId,
                                      )
                                    );
                                  })
                            ).pop()) || void 0 === w
                            ? void 0
                            : w.title);
                      (i =
                        null === (d = window) || void 0 === d
                          ? void 0
                          : null === (u = d.products) || void 0 === u
                          ? void 0
                          : null === (g = u[n.freeProductHandle]) ||
                            void 0 === g
                          ? void 0
                          : g.featured_image),
                        (l = formatPrice(
                          null === (f = window) || void 0 === f
                            ? void 0
                            : null === (_ = f.products) || void 0 === _
                            ? void 0
                            : null === (v = _[n.freeProductHandle]) ||
                              void 0 === v
                            ? void 0
                            : v.price,
                        ));
                    }
                    null != h && h.afterCycle2 && e < 1
                      ? (S =
                          S +
                          ' ' +
                          L(
                            getBillingCycleText(n.afterCycle),
                            n.value,
                            n.discountType,
                            !1,
                            !1,
                            t,
                          ))
                      : (null != h && h.afterCycle2) ||
                        (e < 2 &&
                          (S =
                            0 == e
                              ? L(
                                  getBillingCycleText(n.afterCycle),
                                  n.value,
                                  n.discountType,
                                  !1,
                                  !0,
                                  t,
                                  i,
                                  l,
                                )
                              : S +
                                ' ' +
                                L(
                                  getBillingCycleText(n.afterCycle),
                                  n.value,
                                  n.discountType,
                                  !1,
                                  !1,
                                  t,
                                  i,
                                  l,
                                )));
                  });
                e.find('.appstle_applied_discountText').html(S);
              }
              function B(e, n, t, i, l) {
                if (i) {
                  'appstle_unsubscribe' === i && (l = !0), V();
                  var a = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      id: null == n ? void 0 : n.key,
                      quantity: (null == n ? void 0 : n.quantity) || 1,
                      selling_plan: l ? '' : i,
                    }),
                  };
                  fetch('/cart/change.js', a)
                    .then(function (e) {
                      return e.json();
                    })
                    .then(function (e) {
                      setTimeout(function () {
                        q();
                      }, 200);
                    })
                    .catch(function (e) {
                      return console.error(e);
                    });
                }
              }
              function J(e, n) {
                return e.filter(function (e) {
                  return -1 != n.indexOf(e);
                });
              }
              k &&
                (jQuery(document).on('click', '.default_option', function () {
                  jQuery(this).parent().toggleClass('active');
                }),
                jQuery(document).on('click', '.select_ul li', function () {
                  var e = jQuery(this).html();
                  jQuery(this)
                    .parents('.appstle_radio_section')
                    .find('.default_option li')
                    .html(e),
                    jQuery(this)
                      .parents('.appstle_radio_section')
                      .find('.select_ul li')
                      .removeClass('active'),
                    jQuery(this).addClass('active'),
                    jQuery(this).parents('.select_wrap').removeClass('active'),
                    jQuery(this)
                      .parents('.appstle_radio_section')
                      .find('select')
                      .val(jQuery(this).attr('value')),
                    jQuery(this)
                      .parents('.appstle_radio_section')
                      .find('select')
                      .trigger('change');
                }));
            })();
      });
    }),
    Shopify &&
      Shopify.checkout &&
      isOrderEligibleForThankyouBox() &&
      null !== (_RS10 = RS) &&
      void 0 !== _RS10 &&
      null !== (_RS10$Config = _RS10.Config) &&
      void 0 !== _RS10$Config &&
      _RS10$Config.showCheckoutSubscriptionBtn)
  ) {
    var destination = '/' + RS.Config.manageSubscriptionUrl,
      message =
        RS.Config.orderStatusManageSubscriptionDescription ||
        'Continue to your account to view and manage your subscriptions.';
    Shopify.checkout && Shopify.checkout.order_id
      ? (console.log('orderId=' + Shopify.checkout.order_id),
        fetch(
          location.origin +
            '/apps/subscriptions?action=customer_payment_token&order_id=' +
            Shopify.checkout.order_id,
        )
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            (destination = destination + '?token=' + e.token),
              Shopify.Checkout.OrderStatus.addContentBox(
                '<h2 class="heading-2 os-step__title">' +
                  (RS.Config.orderStatusManageSubscriptionTitle ||
                    'Subscription') +
                  '</h2><div class="os-step__info--item"><p class="os-step__description" style="margin-top: 0.5714285714em;">' +
                  message +
                  '</p></div><a class="ui-button btn btn--subdued btn--size-small shown-if-js os-step__info" href="' +
                  destination +
                  '"> ' +
                  (RS.Config.orderStatusManageSubscriptionButtonText ||
                    'Manage your subscription') +
                  '</a>',
              );
          }))
      : Shopify.Checkout.OrderStatus.addContentBox(
          '<h2 class="heading-2 os-step__title">' +
            (RS.Config.orderStatusManageSubscriptionTitle || 'Subscription') +
            '</h2><div class="os-step__info--item"><p class="os-step__description" style="margin-top: 0.5714285714em;">' +
            message +
            '</p></div><a class="ui-button btn btn--subdued btn--size-small shown-if-js os-step__info" href="' +
            destination +
            '"> ' +
            (RS.Config.orderStatusManageSubscriptionButtonText ||
              'Manage your subscription') +
            '</a>',
        );
  }
};
appstleInit();
