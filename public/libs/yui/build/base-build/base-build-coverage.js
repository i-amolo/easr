/* YUI 3.8.1 (build 5795) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/base-build/base-build.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/base-build/base-build.js",
    code: []
};
_yuitest_coverage["build/base-build/base-build.js"].code=["YUI.add('base-build', function (Y, NAME) {","","    /**","     * The base-build submodule provides Base.build functionality, which","     * can be used to create custom classes, by aggregating extensions onto","     * a main class.","     *","     * @module base","     * @submodule base-build","     * @for Base","     */","    var BaseCore = Y.BaseCore,","        Base     = Y.Base,","        L        = Y.Lang,","","        INITIALIZER = \"initializer\",","        DESTRUCTOR  = \"destructor\",","        AGGREGATES  = [\"_PLUG\", \"_UNPLUG\"],","","        build;","","    // Utility function used in `_buildCfg` to aggregate array values into a new","    // array from the sender constructor to the reciver constructor.","    function arrayAggregator(prop, r, s) {","        if (s[prop]) {","            r[prop] = (r[prop] || []).concat(s[prop]);","        }","    }","","    // Utility function used in `_buildCfg` to aggregate `_ATTR_CFG` array","    // values from the sender constructor into a new array on reciver's","    // constructor, and clear the cached hash.","    function attrCfgAggregator(prop, r, s) {","        if (s._ATTR_CFG) {","            arrayAggregator.apply(null, arguments);","","            // Clear cached hash.","            r._ATTR_CFG_HASH = null;","        }","    }","","    // Utility function used in `_buildCfg` to aggregate ATTRS configs from one","    // the sender constructor to the reciver constructor.","    function attrsAggregator(prop, r, s) {","        var sAttrs, rAttrs, a;","","        r.ATTRS = r.ATTRS || {};","","        if (s.ATTRS) {","            sAttrs = s.ATTRS;","            rAttrs = r.ATTRS;","","            for (a in sAttrs) {","                if (sAttrs.hasOwnProperty(a)) {","                    rAttrs[a] = rAttrs[a] || {};","                    Y.mix(rAttrs[a], sAttrs[a], true);","                }","            }","        }","    }","","    Base._build = function(name, main, extensions, px, sx, cfg) {","","        var build = Base._build,","","            builtClass = build._ctor(main, cfg),","            buildCfg = build._cfg(main, cfg, extensions),","","            _mixCust = build._mixCust,","","            dynamic = builtClass._yuibuild.dynamic,","","            i, l, extClass, extProto,","            initializer,","            destructor;","","        // Augment/Aggregate","        for (i = 0, l = extensions.length; i < l; i++) {","            extClass = extensions[i];","","            extProto = extClass.prototype;","","            initializer = extProto[INITIALIZER];","            destructor = extProto[DESTRUCTOR];","            delete extProto[INITIALIZER];","            delete extProto[DESTRUCTOR];","","            // Prototype, old non-displacing augment","            Y.mix(builtClass, extClass, true, null, 1);","","            // Custom Statics","            _mixCust(builtClass, extClass, buildCfg);","","            if (initializer) {","                extProto[INITIALIZER] = initializer;","            }","","            if (destructor) {","                extProto[DESTRUCTOR] = destructor;","            }","","            builtClass._yuibuild.exts.push(extClass);","        }","","        if (px) {","            Y.mix(builtClass.prototype, px, true);","        }","","        if (sx) {","            Y.mix(builtClass, build._clean(sx, buildCfg), true);","            _mixCust(builtClass, sx, buildCfg);","        }","","        builtClass.prototype.hasImpl = build._impl;","","        if (dynamic) {","            builtClass.NAME = name;","            builtClass.prototype.constructor = builtClass;","        }","","        return builtClass;","    };","","    build = Base._build;","","    Y.mix(build, {","","        _mixCust: function(r, s, cfg) {","","            var aggregates,","                custom,","                statics,","                aggr,","                l,","                i;","","            if (cfg) {","                aggregates = cfg.aggregates;","                custom = cfg.custom;","                statics = cfg.statics;","            }","","            if (statics) {","                Y.mix(r, s, true, statics);","            }","","            if (aggregates) {","                for (i = 0, l = aggregates.length; i < l; i++) {","                    aggr = aggregates[i];","                    if (!r.hasOwnProperty(aggr) && s.hasOwnProperty(aggr)) {","                        r[aggr] = L.isArray(s[aggr]) ? [] : {};","                    }","                    Y.aggregate(r, s, true, [aggr]);","                }","            }","","            if (custom) {","                for (i in custom) {","                    if (custom.hasOwnProperty(i)) {","                        custom[i](i, r, s);","                    }","                }","            }","","        },","","        _tmpl: function(main) {","","            function BuiltClass() {","                BuiltClass.superclass.constructor.apply(this, arguments);","            }","            Y.extend(BuiltClass, main);","","            return BuiltClass;","        },","","        _impl : function(extClass) {","            var classes = this._getClasses(), i, l, cls, exts, ll, j;","            for (i = 0, l = classes.length; i < l; i++) {","                cls = classes[i];","                if (cls._yuibuild) {","                    exts = cls._yuibuild.exts;","                    ll = exts.length;","","                    for (j = 0; j < ll; j++) {","                        if (exts[j] === extClass) {","                            return true;","                        }","                    }","                }","            }","            return false;","        },","","        _ctor : function(main, cfg) {","","           var dynamic = (cfg && false === cfg.dynamic) ? false : true,","               builtClass = (dynamic) ? build._tmpl(main) : main,","               buildCfg = builtClass._yuibuild;","","            if (!buildCfg) {","                buildCfg = builtClass._yuibuild = {};","            }","","            buildCfg.id = buildCfg.id || null;","            buildCfg.exts = buildCfg.exts || [];","            buildCfg.dynamic = dynamic;","","            return builtClass;","        },","","        _cfg : function(main, cfg, exts) {","            var aggr = [],","                cust = {},","                statics = [],","                buildCfg,","                cfgAggr = (cfg && cfg.aggregates),","                cfgCustBuild = (cfg && cfg.custom),","                cfgStatics = (cfg && cfg.statics),","                c = main,","                i,","                l;","","            // Prototype Chain","            while (c && c.prototype) {","                buildCfg = c._buildCfg;","                if (buildCfg) {","                    if (buildCfg.aggregates) {","                        aggr = aggr.concat(buildCfg.aggregates);","                    }","                    if (buildCfg.custom) {","                        Y.mix(cust, buildCfg.custom, true);","                    }","                    if (buildCfg.statics) {","                        statics = statics.concat(buildCfg.statics);","                    }","                }","                c = c.superclass ? c.superclass.constructor : null;","            }","","            // Exts","            if (exts) {","                for (i = 0, l = exts.length; i < l; i++) {","                    c = exts[i];","                    buildCfg = c._buildCfg;","                    if (buildCfg) {","                        if (buildCfg.aggregates) {","                            aggr = aggr.concat(buildCfg.aggregates);","                        }","                        if (buildCfg.custom) {","                            Y.mix(cust, buildCfg.custom, true);","                        }","                        if (buildCfg.statics) {","                            statics = statics.concat(buildCfg.statics);","                        }","                    }","                }","            }","","            if (cfgAggr) {","                aggr = aggr.concat(cfgAggr);","            }","","            if (cfgCustBuild) {","                Y.mix(cust, cfg.cfgBuild, true);","            }","","            if (cfgStatics) {","                statics = statics.concat(cfgStatics);","            }","","            return {","                aggregates: aggr,","                custom: cust,","                statics: statics","            };","        },","","        _clean : function(sx, cfg) {","            var prop, i, l, sxclone = Y.merge(sx),","                aggregates = cfg.aggregates,","                custom = cfg.custom;","","            for (prop in custom) {","                if (sxclone.hasOwnProperty(prop)) {","                    delete sxclone[prop];","                }","            }","","            for (i = 0, l = aggregates.length; i < l; i++) {","                prop = aggregates[i];","                if (sxclone.hasOwnProperty(prop)) {","                    delete sxclone[prop];","                }","            }","","            return sxclone;","        }","    });","","    /**","     * <p>","     * Builds a custom constructor function (class) from the","     * main function, and array of extension functions (classes)","     * provided. The NAME field for the constructor function is","     * defined by the first argument passed in.","     * </p>","     * <p>","     * The cfg object supports the following properties","     * </p>","     * <dl>","     *    <dt>dynamic &#60;boolean&#62;</dt>","     *    <dd>","     *    <p>If true (default), a completely new class","     *    is created which extends the main class, and acts as the","     *    host on which the extension classes are augmented.</p>","     *    <p>If false, the extensions classes are augmented directly to","     *    the main class, modifying the main class' prototype.</p>","     *    </dd>","     *    <dt>aggregates &#60;String[]&#62;</dt>","     *    <dd>An array of static property names, which will get aggregated","     *    on to the built class, in addition to the default properties build","     *    will always aggregate as defined by the main class' static _buildCfg","     *    property.","     *    </dd>","     * </dl>","     *","     * @method build","     * @deprecated Use the more convenient Base.create and Base.mix methods instead","     * @static","     * @param {Function} name The name of the new class. Used to define the NAME property for the new class.","     * @param {Function} main The main class on which to base the built class","     * @param {Function[]} extensions The set of extension classes which will be","     * augmented/aggregated to the built class.","     * @param {Object} cfg Optional. Build configuration for the class (see description).","     * @return {Function} A custom class, created from the provided main and extension classes","     */","    Base.build = function(name, main, extensions, cfg) {","        return build(name, main, extensions, null, null, cfg);","    };","","    /**","     * Creates a new class (constructor function) which extends the base class passed in as the second argument,","     * and mixes in the array of extensions provided.","     *","     * Prototype properties or methods can be added to the new class, using the px argument (similar to Y.extend).","     *","     * Static properties or methods can be added to the new class, using the sx argument (similar to Y.extend).","     *","     * **NOTE FOR COMPONENT DEVELOPERS**: Both the `base` class, and `extensions` can define static a `_buildCfg`","     * property, which acts as class creation meta-data, and drives how special static properties from the base","     * class, or extensions should be copied, aggregated or (custom) mixed into the newly created class.","     *","     * The `_buildCfg` property is a hash with 3 supported properties: `statics`, `aggregates` and `custom`, e.g:","     *","     *     // If the Base/Main class is the thing introducing the property:","     *","     *     MyBaseClass._buildCfg = {","     *","     *        // Static properties/methods to copy (Alias) to the built class.","     *        statics: [\"CopyThisMethod\", \"CopyThisProperty\"],","     *","     *        // Static props to aggregate onto the built class.","     *        aggregates: [\"AggregateThisProperty\"],","     *","     *        // Static properties which need custom handling (e.g. deep merge etc.)","     *        custom: {","     *           \"CustomProperty\" : function(property, Receiver, Supplier) {","     *              ...","     *              var triggers = Receiver.CustomProperty.triggers;","                    Receiver.CustomProperty.triggers = triggers.concat(Supplier.CustomProperty.triggers);","     *              ...","     *           }","     *        }","     *     };","     *","     *     MyBaseClass.CopyThisMethod = function() {...};","     *     MyBaseClass.CopyThisProperty = \"foo\";","     *     MyBaseClass.AggregateThisProperty = {...};","     *     MyBaseClass.CustomProperty = {","     *        triggers: [...]","     *     }","     *","     *     // Or, if the Extension is the thing introducing the property:","     *","     *     MyExtension._buildCfg = {","     *         statics : ...","     *         aggregates : ...","     *         custom : ...","     *     }","     *","     * This way, when users pass your base or extension class to `Y.Base.create` or `Y.Base.mix`, they don't need to","     * know which properties need special handling. `Y.Base` has a buildCfg which defines `ATTRS` for custom mix handling","     * (to protect the static config objects), and `Y.Widget` has a buildCfg which specifies `HTML_PARSER` for","     * straight up aggregation.","     *","     * @method create","     * @static","     * @param {Function} name The name of the newly created class. Used to define the NAME property for the new class.","     * @param {Function} main The base class which the new class should extend. This class needs to be Base or a class derived from base (e.g. Widget).","     * @param {Function[]} extensions The list of extensions which will be mixed into the built class.","     * @param {Object} px The set of prototype properties/methods to add to the built class.","     * @param {Object} sx The set of static properties/methods to add to the built class.","     * @return {Function} The newly created class.","     */","    Base.create = function(name, base, extensions, px, sx) {","        return build(name, base, extensions, px, sx);","    };","","    /**","     * <p>Mixes in a list of extensions to an existing class.</p>","     * @method mix","     * @static","     * @param {Function} main The existing class into which the extensions should be mixed.  The class needs to be Base or a class derived from Base (e.g. Widget)","     * @param {Function[]} extensions The set of extension classes which will mixed into the existing main class.","     * @return {Function} The modified main class, with extensions mixed in.","     */","    Base.mix = function(main, extensions) {","        return build(null, main, extensions, null, null, {dynamic:false});","    };","","    /**","     * The build configuration for the Base class.","     *","     * Defines the static fields which need to be aggregated when the Base class","     * is used as the main class passed to the","     * <a href=\"#method_Base.build\">Base.build</a> method.","     *","     * @property _buildCfg","     * @type Object","     * @static","     * @final","     * @private","     */","    BaseCore._buildCfg = {","        custom: {","            ATTRS         : attrsAggregator,","            _ATTR_CFG     : attrCfgAggregator,","            _NON_ATTRS_CFG: arrayAggregator","        },","","        aggregates: AGGREGATES.concat()","    };","","    // Makes sure Base and BaseCore use separate `_buildCfg` objects.","    Base._buildCfg = {","        custom: {","            ATTRS         : attrsAggregator,","            _ATTR_CFG     : attrCfgAggregator,","            _NON_ATTRS_CFG: arrayAggregator","        },","","        aggregates: AGGREGATES.concat()","    };","","","}, '3.8.1', {\"requires\": [\"base-base\"]});"];
_yuitest_coverage["build/base-build/base-build.js"].lines = {"1":0,"12":0,"24":0,"25":0,"26":0,"33":0,"34":0,"35":0,"38":0,"44":0,"45":0,"47":0,"49":0,"50":0,"51":0,"53":0,"54":0,"55":0,"56":0,"62":0,"64":0,"78":0,"79":0,"81":0,"83":0,"84":0,"85":0,"86":0,"89":0,"92":0,"94":0,"95":0,"98":0,"99":0,"102":0,"105":0,"106":0,"109":0,"110":0,"111":0,"114":0,"116":0,"117":0,"118":0,"121":0,"124":0,"126":0,"130":0,"137":0,"138":0,"139":0,"140":0,"143":0,"144":0,"147":0,"148":0,"149":0,"150":0,"151":0,"153":0,"157":0,"158":0,"159":0,"160":0,"169":0,"170":0,"172":0,"174":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"185":0,"186":0,"187":0,"192":0,"197":0,"201":0,"202":0,"205":0,"206":0,"207":0,"209":0,"213":0,"225":0,"226":0,"227":0,"228":0,"229":0,"231":0,"232":0,"234":0,"235":0,"238":0,"242":0,"243":0,"244":0,"245":0,"246":0,"247":0,"248":0,"250":0,"251":0,"253":0,"254":0,"260":0,"261":0,"264":0,"265":0,"268":0,"269":0,"272":0,"280":0,"284":0,"285":0,"286":0,"290":0,"291":0,"292":0,"293":0,"297":0,"338":0,"339":0,"406":0,"407":0,"418":0,"419":0,"435":0,"446":0};
_yuitest_coverage["build/base-build/base-build.js"].functions = {"arrayAggregator:24":0,"attrCfgAggregator:33":0,"attrsAggregator:44":0,"_build:62":0,"_mixCust:128":0,"BuiltClass:169":0,"_tmpl:167":0,"_impl:177":0,"_ctor:195":0,"_cfg:212":0,"_clean:279":0,"build:338":0,"create:406":0,"mix:418":0,"(anonymous 1):1":0};
_yuitest_coverage["build/base-build/base-build.js"].coveredLines = 131;
_yuitest_coverage["build/base-build/base-build.js"].coveredFunctions = 15;
_yuitest_coverline("build/base-build/base-build.js", 1);
YUI.add('base-build', function (Y, NAME) {

    /**
     * The base-build submodule provides Base.build functionality, which
     * can be used to create custom classes, by aggregating extensions onto
     * a main class.
     *
     * @module base
     * @submodule base-build
     * @for Base
     */
    _yuitest_coverfunc("build/base-build/base-build.js", "(anonymous 1)", 1);
_yuitest_coverline("build/base-build/base-build.js", 12);
var BaseCore = Y.BaseCore,
        Base     = Y.Base,
        L        = Y.Lang,

        INITIALIZER = "initializer",
        DESTRUCTOR  = "destructor",
        AGGREGATES  = ["_PLUG", "_UNPLUG"],

        build;

    // Utility function used in `_buildCfg` to aggregate array values into a new
    // array from the sender constructor to the reciver constructor.
    _yuitest_coverline("build/base-build/base-build.js", 24);
function arrayAggregator(prop, r, s) {
        _yuitest_coverfunc("build/base-build/base-build.js", "arrayAggregator", 24);
_yuitest_coverline("build/base-build/base-build.js", 25);
if (s[prop]) {
            _yuitest_coverline("build/base-build/base-build.js", 26);
r[prop] = (r[prop] || []).concat(s[prop]);
        }
    }

    // Utility function used in `_buildCfg` to aggregate `_ATTR_CFG` array
    // values from the sender constructor into a new array on reciver's
    // constructor, and clear the cached hash.
    _yuitest_coverline("build/base-build/base-build.js", 33);
function attrCfgAggregator(prop, r, s) {
        _yuitest_coverfunc("build/base-build/base-build.js", "attrCfgAggregator", 33);
_yuitest_coverline("build/base-build/base-build.js", 34);
if (s._ATTR_CFG) {
            _yuitest_coverline("build/base-build/base-build.js", 35);
arrayAggregator.apply(null, arguments);

            // Clear cached hash.
            _yuitest_coverline("build/base-build/base-build.js", 38);
r._ATTR_CFG_HASH = null;
        }
    }

    // Utility function used in `_buildCfg` to aggregate ATTRS configs from one
    // the sender constructor to the reciver constructor.
    _yuitest_coverline("build/base-build/base-build.js", 44);
function attrsAggregator(prop, r, s) {
        _yuitest_coverfunc("build/base-build/base-build.js", "attrsAggregator", 44);
_yuitest_coverline("build/base-build/base-build.js", 45);
var sAttrs, rAttrs, a;

        _yuitest_coverline("build/base-build/base-build.js", 47);
r.ATTRS = r.ATTRS || {};

        _yuitest_coverline("build/base-build/base-build.js", 49);
if (s.ATTRS) {
            _yuitest_coverline("build/base-build/base-build.js", 50);
sAttrs = s.ATTRS;
            _yuitest_coverline("build/base-build/base-build.js", 51);
rAttrs = r.ATTRS;

            _yuitest_coverline("build/base-build/base-build.js", 53);
for (a in sAttrs) {
                _yuitest_coverline("build/base-build/base-build.js", 54);
if (sAttrs.hasOwnProperty(a)) {
                    _yuitest_coverline("build/base-build/base-build.js", 55);
rAttrs[a] = rAttrs[a] || {};
                    _yuitest_coverline("build/base-build/base-build.js", 56);
Y.mix(rAttrs[a], sAttrs[a], true);
                }
            }
        }
    }

    _yuitest_coverline("build/base-build/base-build.js", 62);
Base._build = function(name, main, extensions, px, sx, cfg) {

        _yuitest_coverfunc("build/base-build/base-build.js", "_build", 62);
_yuitest_coverline("build/base-build/base-build.js", 64);
var build = Base._build,

            builtClass = build._ctor(main, cfg),
            buildCfg = build._cfg(main, cfg, extensions),

            _mixCust = build._mixCust,

            dynamic = builtClass._yuibuild.dynamic,

            i, l, extClass, extProto,
            initializer,
            destructor;

        // Augment/Aggregate
        _yuitest_coverline("build/base-build/base-build.js", 78);
for (i = 0, l = extensions.length; i < l; i++) {
            _yuitest_coverline("build/base-build/base-build.js", 79);
extClass = extensions[i];

            _yuitest_coverline("build/base-build/base-build.js", 81);
extProto = extClass.prototype;

            _yuitest_coverline("build/base-build/base-build.js", 83);
initializer = extProto[INITIALIZER];
            _yuitest_coverline("build/base-build/base-build.js", 84);
destructor = extProto[DESTRUCTOR];
            _yuitest_coverline("build/base-build/base-build.js", 85);
delete extProto[INITIALIZER];
            _yuitest_coverline("build/base-build/base-build.js", 86);
delete extProto[DESTRUCTOR];

            // Prototype, old non-displacing augment
            _yuitest_coverline("build/base-build/base-build.js", 89);
Y.mix(builtClass, extClass, true, null, 1);

            // Custom Statics
            _yuitest_coverline("build/base-build/base-build.js", 92);
_mixCust(builtClass, extClass, buildCfg);

            _yuitest_coverline("build/base-build/base-build.js", 94);
if (initializer) {
                _yuitest_coverline("build/base-build/base-build.js", 95);
extProto[INITIALIZER] = initializer;
            }

            _yuitest_coverline("build/base-build/base-build.js", 98);
if (destructor) {
                _yuitest_coverline("build/base-build/base-build.js", 99);
extProto[DESTRUCTOR] = destructor;
            }

            _yuitest_coverline("build/base-build/base-build.js", 102);
builtClass._yuibuild.exts.push(extClass);
        }

        _yuitest_coverline("build/base-build/base-build.js", 105);
if (px) {
            _yuitest_coverline("build/base-build/base-build.js", 106);
Y.mix(builtClass.prototype, px, true);
        }

        _yuitest_coverline("build/base-build/base-build.js", 109);
if (sx) {
            _yuitest_coverline("build/base-build/base-build.js", 110);
Y.mix(builtClass, build._clean(sx, buildCfg), true);
            _yuitest_coverline("build/base-build/base-build.js", 111);
_mixCust(builtClass, sx, buildCfg);
        }

        _yuitest_coverline("build/base-build/base-build.js", 114);
builtClass.prototype.hasImpl = build._impl;

        _yuitest_coverline("build/base-build/base-build.js", 116);
if (dynamic) {
            _yuitest_coverline("build/base-build/base-build.js", 117);
builtClass.NAME = name;
            _yuitest_coverline("build/base-build/base-build.js", 118);
builtClass.prototype.constructor = builtClass;
        }

        _yuitest_coverline("build/base-build/base-build.js", 121);
return builtClass;
    };

    _yuitest_coverline("build/base-build/base-build.js", 124);
build = Base._build;

    _yuitest_coverline("build/base-build/base-build.js", 126);
Y.mix(build, {

        _mixCust: function(r, s, cfg) {

            _yuitest_coverfunc("build/base-build/base-build.js", "_mixCust", 128);
_yuitest_coverline("build/base-build/base-build.js", 130);
var aggregates,
                custom,
                statics,
                aggr,
                l,
                i;

            _yuitest_coverline("build/base-build/base-build.js", 137);
if (cfg) {
                _yuitest_coverline("build/base-build/base-build.js", 138);
aggregates = cfg.aggregates;
                _yuitest_coverline("build/base-build/base-build.js", 139);
custom = cfg.custom;
                _yuitest_coverline("build/base-build/base-build.js", 140);
statics = cfg.statics;
            }

            _yuitest_coverline("build/base-build/base-build.js", 143);
if (statics) {
                _yuitest_coverline("build/base-build/base-build.js", 144);
Y.mix(r, s, true, statics);
            }

            _yuitest_coverline("build/base-build/base-build.js", 147);
if (aggregates) {
                _yuitest_coverline("build/base-build/base-build.js", 148);
for (i = 0, l = aggregates.length; i < l; i++) {
                    _yuitest_coverline("build/base-build/base-build.js", 149);
aggr = aggregates[i];
                    _yuitest_coverline("build/base-build/base-build.js", 150);
if (!r.hasOwnProperty(aggr) && s.hasOwnProperty(aggr)) {
                        _yuitest_coverline("build/base-build/base-build.js", 151);
r[aggr] = L.isArray(s[aggr]) ? [] : {};
                    }
                    _yuitest_coverline("build/base-build/base-build.js", 153);
Y.aggregate(r, s, true, [aggr]);
                }
            }

            _yuitest_coverline("build/base-build/base-build.js", 157);
if (custom) {
                _yuitest_coverline("build/base-build/base-build.js", 158);
for (i in custom) {
                    _yuitest_coverline("build/base-build/base-build.js", 159);
if (custom.hasOwnProperty(i)) {
                        _yuitest_coverline("build/base-build/base-build.js", 160);
custom[i](i, r, s);
                    }
                }
            }

        },

        _tmpl: function(main) {

            _yuitest_coverfunc("build/base-build/base-build.js", "_tmpl", 167);
_yuitest_coverline("build/base-build/base-build.js", 169);
function BuiltClass() {
                _yuitest_coverfunc("build/base-build/base-build.js", "BuiltClass", 169);
_yuitest_coverline("build/base-build/base-build.js", 170);
BuiltClass.superclass.constructor.apply(this, arguments);
            }
            _yuitest_coverline("build/base-build/base-build.js", 172);
Y.extend(BuiltClass, main);

            _yuitest_coverline("build/base-build/base-build.js", 174);
return BuiltClass;
        },

        _impl : function(extClass) {
            _yuitest_coverfunc("build/base-build/base-build.js", "_impl", 177);
_yuitest_coverline("build/base-build/base-build.js", 178);
var classes = this._getClasses(), i, l, cls, exts, ll, j;
            _yuitest_coverline("build/base-build/base-build.js", 179);
for (i = 0, l = classes.length; i < l; i++) {
                _yuitest_coverline("build/base-build/base-build.js", 180);
cls = classes[i];
                _yuitest_coverline("build/base-build/base-build.js", 181);
if (cls._yuibuild) {
                    _yuitest_coverline("build/base-build/base-build.js", 182);
exts = cls._yuibuild.exts;
                    _yuitest_coverline("build/base-build/base-build.js", 183);
ll = exts.length;

                    _yuitest_coverline("build/base-build/base-build.js", 185);
for (j = 0; j < ll; j++) {
                        _yuitest_coverline("build/base-build/base-build.js", 186);
if (exts[j] === extClass) {
                            _yuitest_coverline("build/base-build/base-build.js", 187);
return true;
                        }
                    }
                }
            }
            _yuitest_coverline("build/base-build/base-build.js", 192);
return false;
        },

        _ctor : function(main, cfg) {

           _yuitest_coverfunc("build/base-build/base-build.js", "_ctor", 195);
_yuitest_coverline("build/base-build/base-build.js", 197);
var dynamic = (cfg && false === cfg.dynamic) ? false : true,
               builtClass = (dynamic) ? build._tmpl(main) : main,
               buildCfg = builtClass._yuibuild;

            _yuitest_coverline("build/base-build/base-build.js", 201);
if (!buildCfg) {
                _yuitest_coverline("build/base-build/base-build.js", 202);
buildCfg = builtClass._yuibuild = {};
            }

            _yuitest_coverline("build/base-build/base-build.js", 205);
buildCfg.id = buildCfg.id || null;
            _yuitest_coverline("build/base-build/base-build.js", 206);
buildCfg.exts = buildCfg.exts || [];
            _yuitest_coverline("build/base-build/base-build.js", 207);
buildCfg.dynamic = dynamic;

            _yuitest_coverline("build/base-build/base-build.js", 209);
return builtClass;
        },

        _cfg : function(main, cfg, exts) {
            _yuitest_coverfunc("build/base-build/base-build.js", "_cfg", 212);
_yuitest_coverline("build/base-build/base-build.js", 213);
var aggr = [],
                cust = {},
                statics = [],
                buildCfg,
                cfgAggr = (cfg && cfg.aggregates),
                cfgCustBuild = (cfg && cfg.custom),
                cfgStatics = (cfg && cfg.statics),
                c = main,
                i,
                l;

            // Prototype Chain
            _yuitest_coverline("build/base-build/base-build.js", 225);
while (c && c.prototype) {
                _yuitest_coverline("build/base-build/base-build.js", 226);
buildCfg = c._buildCfg;
                _yuitest_coverline("build/base-build/base-build.js", 227);
if (buildCfg) {
                    _yuitest_coverline("build/base-build/base-build.js", 228);
if (buildCfg.aggregates) {
                        _yuitest_coverline("build/base-build/base-build.js", 229);
aggr = aggr.concat(buildCfg.aggregates);
                    }
                    _yuitest_coverline("build/base-build/base-build.js", 231);
if (buildCfg.custom) {
                        _yuitest_coverline("build/base-build/base-build.js", 232);
Y.mix(cust, buildCfg.custom, true);
                    }
                    _yuitest_coverline("build/base-build/base-build.js", 234);
if (buildCfg.statics) {
                        _yuitest_coverline("build/base-build/base-build.js", 235);
statics = statics.concat(buildCfg.statics);
                    }
                }
                _yuitest_coverline("build/base-build/base-build.js", 238);
c = c.superclass ? c.superclass.constructor : null;
            }

            // Exts
            _yuitest_coverline("build/base-build/base-build.js", 242);
if (exts) {
                _yuitest_coverline("build/base-build/base-build.js", 243);
for (i = 0, l = exts.length; i < l; i++) {
                    _yuitest_coverline("build/base-build/base-build.js", 244);
c = exts[i];
                    _yuitest_coverline("build/base-build/base-build.js", 245);
buildCfg = c._buildCfg;
                    _yuitest_coverline("build/base-build/base-build.js", 246);
if (buildCfg) {
                        _yuitest_coverline("build/base-build/base-build.js", 247);
if (buildCfg.aggregates) {
                            _yuitest_coverline("build/base-build/base-build.js", 248);
aggr = aggr.concat(buildCfg.aggregates);
                        }
                        _yuitest_coverline("build/base-build/base-build.js", 250);
if (buildCfg.custom) {
                            _yuitest_coverline("build/base-build/base-build.js", 251);
Y.mix(cust, buildCfg.custom, true);
                        }
                        _yuitest_coverline("build/base-build/base-build.js", 253);
if (buildCfg.statics) {
                            _yuitest_coverline("build/base-build/base-build.js", 254);
statics = statics.concat(buildCfg.statics);
                        }
                    }
                }
            }

            _yuitest_coverline("build/base-build/base-build.js", 260);
if (cfgAggr) {
                _yuitest_coverline("build/base-build/base-build.js", 261);
aggr = aggr.concat(cfgAggr);
            }

            _yuitest_coverline("build/base-build/base-build.js", 264);
if (cfgCustBuild) {
                _yuitest_coverline("build/base-build/base-build.js", 265);
Y.mix(cust, cfg.cfgBuild, true);
            }

            _yuitest_coverline("build/base-build/base-build.js", 268);
if (cfgStatics) {
                _yuitest_coverline("build/base-build/base-build.js", 269);
statics = statics.concat(cfgStatics);
            }

            _yuitest_coverline("build/base-build/base-build.js", 272);
return {
                aggregates: aggr,
                custom: cust,
                statics: statics
            };
        },

        _clean : function(sx, cfg) {
            _yuitest_coverfunc("build/base-build/base-build.js", "_clean", 279);
_yuitest_coverline("build/base-build/base-build.js", 280);
var prop, i, l, sxclone = Y.merge(sx),
                aggregates = cfg.aggregates,
                custom = cfg.custom;

            _yuitest_coverline("build/base-build/base-build.js", 284);
for (prop in custom) {
                _yuitest_coverline("build/base-build/base-build.js", 285);
if (sxclone.hasOwnProperty(prop)) {
                    _yuitest_coverline("build/base-build/base-build.js", 286);
delete sxclone[prop];
                }
            }

            _yuitest_coverline("build/base-build/base-build.js", 290);
for (i = 0, l = aggregates.length; i < l; i++) {
                _yuitest_coverline("build/base-build/base-build.js", 291);
prop = aggregates[i];
                _yuitest_coverline("build/base-build/base-build.js", 292);
if (sxclone.hasOwnProperty(prop)) {
                    _yuitest_coverline("build/base-build/base-build.js", 293);
delete sxclone[prop];
                }
            }

            _yuitest_coverline("build/base-build/base-build.js", 297);
return sxclone;
        }
    });

    /**
     * <p>
     * Builds a custom constructor function (class) from the
     * main function, and array of extension functions (classes)
     * provided. The NAME field for the constructor function is
     * defined by the first argument passed in.
     * </p>
     * <p>
     * The cfg object supports the following properties
     * </p>
     * <dl>
     *    <dt>dynamic &#60;boolean&#62;</dt>
     *    <dd>
     *    <p>If true (default), a completely new class
     *    is created which extends the main class, and acts as the
     *    host on which the extension classes are augmented.</p>
     *    <p>If false, the extensions classes are augmented directly to
     *    the main class, modifying the main class' prototype.</p>
     *    </dd>
     *    <dt>aggregates &#60;String[]&#62;</dt>
     *    <dd>An array of static property names, which will get aggregated
     *    on to the built class, in addition to the default properties build
     *    will always aggregate as defined by the main class' static _buildCfg
     *    property.
     *    </dd>
     * </dl>
     *
     * @method build
     * @deprecated Use the more convenient Base.create and Base.mix methods instead
     * @static
     * @param {Function} name The name of the new class. Used to define the NAME property for the new class.
     * @param {Function} main The main class on which to base the built class
     * @param {Function[]} extensions The set of extension classes which will be
     * augmented/aggregated to the built class.
     * @param {Object} cfg Optional. Build configuration for the class (see description).
     * @return {Function} A custom class, created from the provided main and extension classes
     */
    _yuitest_coverline("build/base-build/base-build.js", 338);
Base.build = function(name, main, extensions, cfg) {
        _yuitest_coverfunc("build/base-build/base-build.js", "build", 338);
_yuitest_coverline("build/base-build/base-build.js", 339);
return build(name, main, extensions, null, null, cfg);
    };

    /**
     * Creates a new class (constructor function) which extends the base class passed in as the second argument,
     * and mixes in the array of extensions provided.
     *
     * Prototype properties or methods can be added to the new class, using the px argument (similar to Y.extend).
     *
     * Static properties or methods can be added to the new class, using the sx argument (similar to Y.extend).
     *
     * **NOTE FOR COMPONENT DEVELOPERS**: Both the `base` class, and `extensions` can define static a `_buildCfg`
     * property, which acts as class creation meta-data, and drives how special static properties from the base
     * class, or extensions should be copied, aggregated or (custom) mixed into the newly created class.
     *
     * The `_buildCfg` property is a hash with 3 supported properties: `statics`, `aggregates` and `custom`, e.g:
     *
     *     // If the Base/Main class is the thing introducing the property:
     *
     *     MyBaseClass._buildCfg = {
     *
     *        // Static properties/methods to copy (Alias) to the built class.
     *        statics: ["CopyThisMethod", "CopyThisProperty"],
     *
     *        // Static props to aggregate onto the built class.
     *        aggregates: ["AggregateThisProperty"],
     *
     *        // Static properties which need custom handling (e.g. deep merge etc.)
     *        custom: {
     *           "CustomProperty" : function(property, Receiver, Supplier) {
     *              ...
     *              var triggers = Receiver.CustomProperty.triggers;
                    Receiver.CustomProperty.triggers = triggers.concat(Supplier.CustomProperty.triggers);
     *              ...
     *           }
     *        }
     *     };
     *
     *     MyBaseClass.CopyThisMethod = function() {...};
     *     MyBaseClass.CopyThisProperty = "foo";
     *     MyBaseClass.AggregateThisProperty = {...};
     *     MyBaseClass.CustomProperty = {
     *        triggers: [...]
     *     }
     *
     *     // Or, if the Extension is the thing introducing the property:
     *
     *     MyExtension._buildCfg = {
     *         statics : ...
     *         aggregates : ...
     *         custom : ...
     *     }
     *
     * This way, when users pass your base or extension class to `Y.Base.create` or `Y.Base.mix`, they don't need to
     * know which properties need special handling. `Y.Base` has a buildCfg which defines `ATTRS` for custom mix handling
     * (to protect the static config objects), and `Y.Widget` has a buildCfg which specifies `HTML_PARSER` for
     * straight up aggregation.
     *
     * @method create
     * @static
     * @param {Function} name The name of the newly created class. Used to define the NAME property for the new class.
     * @param {Function} main The base class which the new class should extend. This class needs to be Base or a class derived from base (e.g. Widget).
     * @param {Function[]} extensions The list of extensions which will be mixed into the built class.
     * @param {Object} px The set of prototype properties/methods to add to the built class.
     * @param {Object} sx The set of static properties/methods to add to the built class.
     * @return {Function} The newly created class.
     */
    _yuitest_coverline("build/base-build/base-build.js", 406);
Base.create = function(name, base, extensions, px, sx) {
        _yuitest_coverfunc("build/base-build/base-build.js", "create", 406);
_yuitest_coverline("build/base-build/base-build.js", 407);
return build(name, base, extensions, px, sx);
    };

    /**
     * <p>Mixes in a list of extensions to an existing class.</p>
     * @method mix
     * @static
     * @param {Function} main The existing class into which the extensions should be mixed.  The class needs to be Base or a class derived from Base (e.g. Widget)
     * @param {Function[]} extensions The set of extension classes which will mixed into the existing main class.
     * @return {Function} The modified main class, with extensions mixed in.
     */
    _yuitest_coverline("build/base-build/base-build.js", 418);
Base.mix = function(main, extensions) {
        _yuitest_coverfunc("build/base-build/base-build.js", "mix", 418);
_yuitest_coverline("build/base-build/base-build.js", 419);
return build(null, main, extensions, null, null, {dynamic:false});
    };

    /**
     * The build configuration for the Base class.
     *
     * Defines the static fields which need to be aggregated when the Base class
     * is used as the main class passed to the
     * <a href="#method_Base.build">Base.build</a> method.
     *
     * @property _buildCfg
     * @type Object
     * @static
     * @final
     * @private
     */
    _yuitest_coverline("build/base-build/base-build.js", 435);
BaseCore._buildCfg = {
        custom: {
            ATTRS         : attrsAggregator,
            _ATTR_CFG     : attrCfgAggregator,
            _NON_ATTRS_CFG: arrayAggregator
        },

        aggregates: AGGREGATES.concat()
    };

    // Makes sure Base and BaseCore use separate `_buildCfg` objects.
    _yuitest_coverline("build/base-build/base-build.js", 446);
Base._buildCfg = {
        custom: {
            ATTRS         : attrsAggregator,
            _ATTR_CFG     : attrCfgAggregator,
            _NON_ATTRS_CFG: arrayAggregator
        },

        aggregates: AGGREGATES.concat()
    };


}, '3.8.1', {"requires": ["base-base"]});
