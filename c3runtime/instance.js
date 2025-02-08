"use strict";

{
    const C3 = globalThis.C3;
    C3.Behaviors.aekiro_translationB.Instance = class aekiro_translationBInstance extends globalThis.ISDKBehaviorInstanceBase {
        constructor() {
            super();
            const properties = this._getInitProperties();
            this.key = properties[0];

            this.GetObjectInstance().GetUnsavedDataMap().aekiro_translation = this;
            this.isInstanceOfSprite = this.GetObjectInstance().GetPlugin().constructor == C3.Plugins.Sprite;
        }

        PostCreate() {
            this.sdkInstance = this.GetObjectInstance().GetSdkInstance();
            this.sdkInstance_acts = this.GetObjectInstance().GetPlugin().constructor.Acts;
            this.sdkInstance_exps = this.GetObjectInstance().GetPlugin().constructor.Exps;
        }

        updateView(v) {
            if (this.isInstanceOfSprite) {
                this.setFrameAnim(v);
            } else {
                this.sdkInstance.CallAction(this.sdkInstance_acts.SetText, v);
            }
        }


        parseFrameAnim(frameAnim, defaults) {
            //return;
            if (frameAnim == undefined) frameAnim = "";

            frameAnim = frameAnim.split('/');
            var frame, anim;
            if (isNaN(parseInt(frameAnim[0]))) {
                anim = frameAnim[0];
                frame = parseInt(frameAnim[1])
            } else {
                anim = frameAnim[1];
                frame = parseInt(frameAnim[0]);
            }
            if (isNaN(frame)) {
                frame = defaults ? defaults["f"] : undefined;
            }
            if (!isNaN(anim) || !anim) {
                anim = defaults ? defaults["a"] : undefined;
            }
            var res = {
                "f": frame,
                "a": anim
            };
            return res;

        }

        setFrameAnim(v) {
            this.frameAnim = this.parseFrameAnim(v);
            var anim = this.frameAnim["a"];
            var frame = this.frameAnim["f"];
            //console.log(anim+"**"+frame);
            if (anim != undefined) {
                this.sdkInstance.CallAction(this.sdkInstance_acts.SetAnim, anim, 0);
            }
            if (frame != undefined) {
                this.sdkInstance.CallAction(this.sdkInstance_acts.SetAnimFrame, frame, 0);
            }
        }

        _release() {
            super._release();
        }

        _saveToJson() {
            return {
                "key": this.key
            };
        }

        _loadFromJson(o) {
            this.key = o["key"];
        }
    };
}
