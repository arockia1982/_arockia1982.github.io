 define("app", ["Common/BaseMapModel", "dojo/dom", "dojo/on", "dojo/domReady!"],
            function (model, dom, on) {
                "use strict"
                var m = {
                    map: null,
                    index: 0,
                    mapLocations: null,
                    timerHandle: 0,
                    basemaps: [{ btn: dom.byId("basemap0"), type: 'gray' },
                    { btn: dom.byId("basemap1"), type: 'streets' },
                    { btn: dom.byId("basemap2"), type: 'hybrid' },
                    { btn: dom.byId("basemap3"), type: 'topo' },
                    { btn: dom.byId("basemap4"), type: 'national-geographic' },
                    { btn: dom.byId("basemap5"), type: 'oceans' }
                    ],
                    init: function (mapRef) {
                        this.map = mapRef;
                        this.mapLocations = model.mapLocations;
                        function findBasemapType(btn) {
                            var length = m.basemaps.length;
                            for (var i = 0; i < length; i++) {
                                if (btn.id == m.basemaps[i].btn.id) {
                                    return m.basemaps[i].type;
                                }
                            }
                        }
                        // setup handlers
                        for (var i = 0; i < this.basemaps.length; i++) {
                            var basemapType = this.basemaps[i].type;
                            on(this.basemaps[i].btn, "click", function () {
                                m.setBasemap(findBasemapType(this));  // check!
                                //setButtonColors(this);
                                m.setSelected(this);
                            });
                        }
                        on(dom.byId("back"), "click", function () {
                            m.move(false);
                        });
                        on(dom.byId("forward"), "click", function () {
                            m.move(true);
                        });
                        on(dom.byId("tour"), "click", function () {
                            m.playTour();
                        });
                    },
                    setSelected: function (button) {
                        var elements = document.getElementsByClassName('btn btn-default');
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].className = "btn btn-default";
                        }
                        var element = document.getElementsByClassName('btn btn-default active');
                        if (element)
                            element.className = "btn btn-default";
                        if (button)
                            button.className = "btn btn-default active";
                    },
                    setButtonColorsByType: function (type) {
                        var length = this.basemaps.length;
                        for (var i = 0; i < length; i++) {
                            if (type === this.basemaps[i].type) {
                                m.setSelected(this.basemaps[i].btn);
                            }
                        }
                    },
                    setBasemap: function (type) {
                        // Disable playmode
                        dom.byId("tour").checked = false;
                        clearInterval(this.timerHandle);
                        this.map.setBasemap(type);
                    },
                    showBasemap: function (index, moveLocation) {
                        // set map and location
                        var mapType = this.mapLocations[this.index][0];
                        this.map.setBasemap(mapType);
                        this.setButtonColorsByType(mapType);
                        if (moveLocation)
                            this.map.centerAndZoom(this.mapLocations[this.index][1], this.mapLocations[this.index][2]);
                    },
                    move: function (forward) {
                        var i = this.index;
                        if (forward)
                            this.index = this.index < (this.mapLocations.length - 1) ? (this.index + 1) : 0;
                        else
                            this.index = this.index > 0 ? (this.index - 1) : 0;
                        if (i != this.index)
                            this.showBasemap(this.index, true);
                    },
                    playTour: function () {
                        if (dom.byId("tour").checked) {
                            // Start immediately
                            setTimeout(function () {
                                m.index = (m.index < (m.mapLocations.length - 1) ? (m.index + 1) : 0);
                                m.showBasemap(this.index, true);
                            }, 100);
                            // Start timer
                            m.timerHandle = setInterval(function () {
                                if (m.map.loaded) {
                                    m.index = (m.index < (m.mapLocations.length - 1) ? (m.index + 1) : 0);
                                    m.showBasemap(this.index, true);
                                }
                            }, 5000);
                        } else {
                            clearInterval(m.timerHandle);
                        }
                    }
                }
                return m;
            }
        );
