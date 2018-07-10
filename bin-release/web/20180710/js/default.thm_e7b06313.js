window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/Balance.exml'] = window.Balance = (function (_super) {
	__extends(Balance, _super);
	function Balance() {
		_super.call(this);
		this.skinParts = ["balancePool","myBalance"];
		
		this.height = 652.67;
		this.width = 114.67;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.balancePool_i(),this.myBalance_i()];
	}
	var _proto = Balance.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jc_fof_bg_png";
		t.x = 12;
		t.y = 5.33;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "jc_png";
		t.x = 0;
		t.y = 21.33;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "jc_fof_bg_png";
		t.x = 10.99;
		t.y = 326.59;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "fof_png";
		t.x = 0;
		t.y = 341.59;
		return t;
	};
	_proto.balancePool_i = function () {
		var t = new eui.Label();
		this.balancePool = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.78;
		t.left = 27;
		t.right = 53.33;
		t.rotation = 90.03;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textColor = 0xcf958f;
		t.verticalAlign = "middle";
		t.width = 180;
		t.x = 59;
		t.y = 115.03999999999999;
		return t;
	};
	_proto.myBalance_i = function () {
		var t = new eui.Label();
		this.myBalance = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 26.11;
		t.left = 31;
		t.right = 57.67;
		t.rotation = 90.03;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textColor = 0xcf958f;
		t.width = 180;
		t.x = 57;
		t.y = 441.11;
		return t;
	};
	return Balance;
})(eui.Skin);generateEUI.paths['resource/eui_skins/BetTable.exml'] = window.BetTable = (function (_super) {
	__extends(BetTable, _super);
	function BetTable() {
		_super.call(this);
		this.skinParts = ["betTips","table","ratioHe1","ratioLong","ratioHu","betCoin","time","readyTimeLabel","timeNotice","alarmGroup","notice1","longRes","notice1Group","notice2","notice2Group","notice3","huRes","notice3Group"];
		
		this.height = 1485;
		this.width = 794;
		this.betTips_i();
		this.elementsContent = [this.table_i(),this.ratioHe1_i(),this.ratioLong_i(),this.ratioHu_i(),this.betCoin_i(),this.alarmGroup_i(),this.notice1Group_i(),this.notice2Group_i(),this.notice3Group_i()];
		
		eui.Binding.$bindProperties(this, ["notice1"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object1,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object2,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object3,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object4,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object5,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object6,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object7,"alpha");
		eui.Binding.$bindProperties(this, ["notice2"],[0],this._TweenItem2,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object8,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object9,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object10,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object11,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object12,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object13,"alpha");
		eui.Binding.$bindProperties(this, ["notice3"],[0],this._TweenItem3,"target");
		eui.Binding.$bindProperties(this, [0],[],this._Object14,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object15,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object16,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object17,"alpha");
		eui.Binding.$bindProperties(this, [1],[],this._Object18,"alpha");
		eui.Binding.$bindProperties(this, [0],[],this._Object19,"alpha");
	}
	var _proto = BetTable.prototype;

	_proto.betTips_i = function () {
		var t = new egret.tween.TweenGroup();
		this.betTips = t;
		t.items = [this._TweenItem1_i(),this._TweenItem2_i(),this._TweenItem3_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i(),this._To2_i(),this._To3_i(),this._To4_i(),this._To5_i(),this._To6_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto._To2_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object3_i();
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		this._Object3 = t;
		return t;
	};
	_proto._To3_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object4_i();
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		this._Object4 = t;
		return t;
	};
	_proto._To4_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object5_i();
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		this._Object5 = t;
		return t;
	};
	_proto._To5_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object6_i();
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		this._Object6 = t;
		return t;
	};
	_proto._To6_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object7_i();
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		this._Object7 = t;
		return t;
	};
	_proto._TweenItem2_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem2 = t;
		t.paths = [this._Set2_i(),this._To7_i(),this._To8_i(),this._To9_i(),this._To10_i(),this._To11_i(),this._To12_i()];
		return t;
	};
	_proto._Set2_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object8_i();
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		this._Object8 = t;
		return t;
	};
	_proto._To7_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object9_i();
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		this._Object9 = t;
		return t;
	};
	_proto._To8_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		return t;
	};
	_proto._To9_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object10_i();
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		this._Object10 = t;
		return t;
	};
	_proto._To10_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object11_i();
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		this._Object11 = t;
		return t;
	};
	_proto._To11_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object12_i();
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		this._Object12 = t;
		return t;
	};
	_proto._To12_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object13_i();
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		this._Object13 = t;
		return t;
	};
	_proto._TweenItem3_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem3 = t;
		t.paths = [this._Set3_i(),this._To13_i(),this._To14_i(),this._To15_i(),this._To16_i(),this._To17_i(),this._To18_i()];
		return t;
	};
	_proto._Set3_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object14_i();
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		this._Object14 = t;
		return t;
	};
	_proto._To13_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object15_i();
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		this._Object15 = t;
		return t;
	};
	_proto._To14_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		return t;
	};
	_proto._To15_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object16_i();
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		this._Object16 = t;
		return t;
	};
	_proto._To16_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object17_i();
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		this._Object17 = t;
		return t;
	};
	_proto._To17_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object18_i();
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		this._Object18 = t;
		return t;
	};
	_proto._To18_i = function () {
		var t = new egret.tween.To();
		t.duration = 1000;
		t.props = this._Object19_i();
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		this._Object19 = t;
		return t;
	};
	_proto.table_i = function () {
		var t = new eui.Image();
		this.table = t;
		t.source = "table_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ratioHe1_i = function () {
		var t = new eui.Label();
		this.ratioHe1 = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.rotation = 89.98;
		t.size = 34;
		t.text = "8 倍";
		t.textColor = 0xF0BD51;
		t.x = 240;
		t.y = 723.82;
		return t;
	};
	_proto.ratioLong_i = function () {
		var t = new eui.Label();
		this.ratioLong = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.rotation = 89.98;
		t.size = 34;
		t.text = "2 倍";
		t.textColor = 0xF0BD51;
		t.x = 230;
		t.y = 351.68;
		return t;
	};
	_proto.ratioHu_i = function () {
		var t = new eui.Label();
		this.ratioHu = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.rotation = 89.98;
		t.size = 34;
		t.text = "2 倍";
		t.textColor = 0xF0BD51;
		t.x = 227.34;
		t.y = 1090.49;
		return t;
	};
	_proto.betCoin_i = function () {
		var t = new eui.Label();
		this.betCoin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.height = 66.84;
		t.rotation = 89.86;
		t.size = 34;
		t.text = "下注金额：100";
		t.textAlign = "center";
		t.textColor = 0x8ee6fd;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 275.48;
		t.x = 639.84;
		t.y = 606.03;
		return t;
	};
	_proto.alarmGroup_i = function () {
		var t = new eui.Group();
		this.alarmGroup = t;
		t.anchorOffsetX = 0.82;
		t.anchorOffsetY = 2.18;
		t.height = 328;
		t.width = 123.64;
		t.x = 559.32;
		t.y = 580.68;
		t.elementsContent = [this._Image1_i(),this.time_i(),this.readyTimeLabel_i(),this.timeNotice_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "clock_png";
		t.x = 9.94;
		t.y = 34.5;
		return t;
	};
	_proto.time_i = function () {
		var t = new eui.Label();
		this.time = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.height = 40;
		t.rotation = 89.98;
		t.size = 24;
		t.text = "0S";
		t.textAlign = "center";
		t.textColor = 0xfdf2b7;
		t.verticalAlign = "middle";
		t.width = 60;
		t.x = 65.11;
		t.y = 43.49;
		return t;
	};
	_proto.readyTimeLabel_i = function () {
		var t = new eui.Label();
		this.readyTimeLabel = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.height = 40;
		t.rotation = 89.98;
		t.size = 34;
		t.text = "0S";
		t.textAlign = "center";
		t.textColor = 0xFDF2B7;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 60;
		t.x = 65.11;
		t.y = 43.49;
		return t;
	};
	_proto.timeNotice_i = function () {
		var t = new eui.Label();
		this.timeNotice = t;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.rotation = 89.98;
		t.size = 34;
		t.text = "下注时间";
		t.textColor = 0xfdf2b7;
		t.x = 62.11;
		t.y = 127.03;
		return t;
	};
	_proto.notice1Group_i = function () {
		var t = new eui.Group();
		this.notice1Group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298.48;
		t.name = "betLong";
		t.width = 300;
		t.x = 262;
		t.y = 221;
		t.elementsContent = [this.notice1_i(),this.longRes_i()];
		return t;
	};
	_proto.notice1_i = function () {
		var t = new eui.Image();
		this.notice1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "djxz_png";
		t.x = 122.35000000000002;
		t.y = 60.23999999999998;
		return t;
	};
	_proto.longRes_i = function () {
		var t = new eui.Image();
		this.longRes = t;
		t.anchorOffsetX = 54.5;
		t.anchorOffsetY = 69;
		t.rotation = 90.06;
		t.source = "poker_back_png";
		t.x = 292.63;
		t.y = 151.1;
		return t;
	};
	_proto.notice2Group_i = function () {
		var t = new eui.Group();
		this.notice2Group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 300;
		t.name = "betHe";
		t.width = 309.09;
		t.x = 258;
		t.y = 592;
		t.elementsContent = [this.notice2_i()];
		return t;
	};
	_proto.notice2_i = function () {
		var t = new eui.Image();
		this.notice2 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "djxz_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.notice3Group_i = function () {
		var t = new eui.Group();
		this.notice3Group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 307.58;
		t.name = "betHu";
		t.width = 312.12;
		t.x = 258;
		t.y = 958;
		t.elementsContent = [this.notice3_i(),this.huRes_i()];
		return t;
	};
	_proto.notice3_i = function () {
		var t = new eui.Image();
		this.notice3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "djxz_png";
		t.x = 126.35000000000002;
		t.y = 70.66999999999996;
		return t;
	};
	_proto.huRes_i = function () {
		var t = new eui.Image();
		this.huRes = t;
		t.anchorOffsetX = 54.5;
		t.anchorOffsetY = 69;
		t.rotation = 89.92;
		t.source = "poker_back_png";
		t.x = 304.34;
		t.y = 155.57;
		return t;
	};
	return BetTable;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CoinBtn.exml'] = window.CoinBtn = (function (_super) {
	__extends(CoinBtn, _super);
	function CoinBtn() {
		_super.call(this);
		this.skinParts = ["coin1","coin2","coin3","coin4","label1","label2","label3","label4","coin1Xz","coin2Xz","coin3Xz","coin4Xz"];
		
		this.height = 1054;
		this.width = 205;
		this.elementsContent = [this.coin1_i(),this.coin2_i(),this.coin3_i(),this.coin4_i(),this.label1_i(),this.label2_i(),this.label3_i(),this.label4_i(),this.coin1Xz_i(),this.coin2Xz_i(),this.coin3Xz_i(),this.coin4Xz_i()];
	}
	var _proto = CoinBtn.prototype;

	_proto.coin1_i = function () {
		var t = new eui.Image();
		this.coin1 = t;
		t.source = "chip1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.coin2_i = function () {
		var t = new eui.Image();
		this.coin2 = t;
		t.source = "chip2_png";
		t.x = 0;
		t.y = 285;
		return t;
	};
	_proto.coin3_i = function () {
		var t = new eui.Image();
		this.coin3 = t;
		t.source = "chip3_png";
		t.x = 0;
		t.y = 570;
		return t;
	};
	_proto.coin4_i = function () {
		var t = new eui.Image();
		this.coin4 = t;
		t.source = "chip4_png";
		t.x = 0;
		t.y = 855;
		return t;
	};
	_proto.label1_i = function () {
		var t = new eui.Label();
		this.label1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.border = false;
		t.fontFamily = "Bastion";
		t.height = 185.38;
		t.name = "label1";
		t.rotation = 90.56;
		t.size = 69;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x99a55c;
		t.verticalAlign = "middle";
		t.width = 171.98;
		t.x = 199.31;
		t.y = 13.43;
		return t;
	};
	_proto.label2_i = function () {
		var t = new eui.Label();
		this.label2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.border = false;
		t.fontFamily = "Bastion";
		t.height = 181.38;
		t.name = "label2";
		t.rotation = 90.56;
		t.size = 69;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x5f76b4;
		t.verticalAlign = "middle";
		t.width = 172.02;
		t.x = 198.31;
		t.y = 297.88;
		return t;
	};
	_proto.label3_i = function () {
		var t = new eui.Label();
		this.label3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.border = false;
		t.fontFamily = "Bastion";
		t.height = 182.38;
		t.name = "label3";
		t.rotation = 90.56;
		t.size = 69;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xa988c2;
		t.verticalAlign = "middle";
		t.width = 172.02;
		t.x = 198.75;
		t.y = 584.88;
		return t;
	};
	_proto.label4_i = function () {
		var t = new eui.Label();
		this.label4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.border = false;
		t.fontFamily = "Bastion";
		t.height = 181.39;
		t.name = "label4";
		t.rotation = 90.56;
		t.size = 69;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xcb937a;
		t.verticalAlign = "middle";
		t.width = 173.02;
		t.x = 197.32;
		t.y = 869.38;
		return t;
	};
	_proto.coin1Xz_i = function () {
		var t = new eui.Image();
		this.coin1Xz = t;
		t.source = "chip1_xz_png";
		t.visible = false;
		t.x = -6.88;
		t.y = -51.18;
		return t;
	};
	_proto.coin2Xz_i = function () {
		var t = new eui.Image();
		this.coin2Xz = t;
		t.source = "chip2_xz_png";
		t.visible = false;
		t.x = -8;
		t.y = 235;
		return t;
	};
	_proto.coin3Xz_i = function () {
		var t = new eui.Image();
		this.coin3Xz = t;
		t.source = "chip3_xz_png";
		t.visible = false;
		t.x = -6;
		t.y = 519;
		return t;
	};
	_proto.coin4Xz_i = function () {
		var t = new eui.Image();
		this.coin4Xz = t;
		t.source = "chip4_xz_png";
		t.visible = false;
		t.x = -7;
		t.y = 805;
		return t;
	};
	return CoinBtn;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CoinNumber.exml'] = window.CoinNumber = (function (_super) {
	__extends(CoinNumber, _super);
	function CoinNumber() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 111;
		this.width = 66;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = CoinNumber.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 586.67;
		t.source = "chip_num1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return CoinNumber;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Croupier.exml'] = window.Croupier = (function (_super) {
	__extends(Croupier, _super);
	function Croupier() {
		_super.call(this);
		this.skinParts = ["croupier"];
		
		this.height = 296;
		this.width = 419;
		this.elementsContent = [this.croupier_i()];
	}
	var _proto = Croupier.prototype;

	_proto.croupier_i = function () {
		var t = new eui.Image();
		this.croupier = t;
		t.horizontalCenter = 73;
		t.rotation = 359.95;
		t.source = "girl_png";
		t.y = 18.12;
		return t;
	};
	return Croupier;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HistorySkin.exml'] = window.HistorySkin = (function (_super) {
	__extends(HistorySkin, _super);
	function HistorySkin() {
		_super.call(this);
		this.skinParts = ["trend","record"];
		
		this.height = 171;
		this.width = 390;
		this.elementsContent = [this.trend_i(),this.record_i()];
	}
	var _proto = HistorySkin.prototype;

	_proto.trend_i = function () {
		var t = new eui.Image();
		this.trend = t;
		t.source = "trend_png";
		t.x = 44;
		t.y = 0;
		return t;
	};
	_proto.record_i = function () {
		var t = new eui.Image();
		this.record = t;
		t.source = "record_png";
		t.x = 210;
		t.y = 0;
		return t;
	};
	return HistorySkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Menu.exml'] = window.Menu = (function (_super) {
	__extends(Menu, _super);
	function Menu() {
		_super.call(this);
		this.skinParts = ["home","wallet","help","share"];
		
		this.height = 496;
		this.width = 117;
		this.elementsContent = [this.home_i(),this.wallet_i(),this.help_i(),this.share_i()];
	}
	var _proto = Menu.prototype;

	_proto.home_i = function () {
		var t = new eui.Image();
		this.home = t;
		t.source = "icon_home_png";
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.wallet_i = function () {
		var t = new eui.Image();
		this.wallet = t;
		t.source = "icon_wallet_png";
		t.x = 1;
		t.y = 145;
		return t;
	};
	_proto.help_i = function () {
		var t = new eui.Image();
		this.help = t;
		t.source = "icon_help_png";
		t.x = 0;
		t.y = 272;
		return t;
	};
	_proto.share_i = function () {
		var t = new eui.Image();
		this.share = t;
		t.source = "icon_share_png";
		t.x = 1;
		t.y = 407;
		return t;
	};
	return Menu;
})(eui.Skin);generateEUI.paths['resource/eui_skins/NewFile.exml'] = window.NewFile = (function (_super) {
	__extends(NewFile, _super);
	function NewFile() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = NewFile.prototype;

	return NewFile;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "打开";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.text = "21";
		t.textAlign = "center";
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/AlertSkin.exml'] = window.AlertSkin = (function (_super) {
	__extends(AlertSkin, _super);
	function AlertSkin() {
		_super.call(this);
		this.skinParts = ["btn","label"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.btn_i(),this.label_i()];
	}
	var _proto = AlertSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.7;
		t.fillColor = 0x000000;
		t.height = 1716;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "small_popup_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Image();
		this.btn = t;
		t.horizontalCenter = -76;
		t.source = "btn_sure_png";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.label_i = function () {
		var t = new eui.Label();
		this.label = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "SourceHanSansCN-Regular";
		t.height = 80;
		t.left = 595;
		t.right = 435;
		t.rotation = 89.95;
		t.size = 34;
		t.text = "你还未登陆钱包，请先登陆！";
		t.textAlign = "center";
		t.textColor = 0x9f7f74;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 500;
		return t;
	};
	return AlertSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/InfoPanal.exml'] = window.InfoPanal = (function (_super) {
	__extends(InfoPanal, _super);
	function InfoPanal() {
		_super.call(this);
		this.skinParts = ["bgBack","totalLongBet","totalHeBet","totalHuBet","hisScrollerG","hisScroller","historyGroup","longWin","huWin","he","winCoin","longCoin","huCoin","heCoin","longPoker","huPoker","settleGroup","ruleLabel","tipsGroup","betCoin","resCoin","recordG","recordS","recordGroup","close"];
		
		this.height = 1716;
		this.width = 1080;
		this.elementsContent = [this.bgBack_i(),this._Image1_i(),this.historyGroup_i(),this.settleGroup_i(),this.tipsGroup_i(),this.recordGroup_i(),this.close_i()];
	}
	var _proto = InfoPanal.prototype;

	_proto.bgBack_i = function () {
		var t = new eui.Rect();
		this.bgBack = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.7;
		t.fillColor = 0x000000;
		t.height = 1716;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "clip";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "popup_png";
		t.verticalCenter = 0;
		t.x = 140;
		t.y = 238;
		return t;
	};
	_proto.historyGroup_i = function () {
		var t = new eui.Group();
		this.historyGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this.totalLongBet_i(),this.totalHeBet_i(),this.totalHuBet_i(),this.hisScroller_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "title_text_lszs_png";
		t.x = 854.5800000000002;
		t.y = 296.61;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "cp_bg_png";
		t.x = 861.58;
		t.y = 523.13;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "cp_bg_png";
		t.x = 861.59;
		t.y = 747.33;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "cp_bg_png";
		t.x = 860.25;
		t.y = 972.34;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.source = "cp_loong_png";
		t.width = 60;
		t.x = 849.81;
		t.y = 497.15;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 60;
		t.source = "cp_he_png";
		t.width = 60;
		t.x = 849.92;
		t.y = 717.33;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.height = 60;
		t.source = "cp_tiger_png";
		t.width = 60;
		t.x = 849.18;
		t.y = 942.34;
		return t;
	};
	_proto.totalLongBet_i = function () {
		var t = new eui.Label();
		this.totalLongBet = t;
		t.anchorOffsetX = 0;
		t.rotation = 90.03;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x9f7c6b;
		t.verticalAlign = "middle";
		t.width = 73;
		t.x = 897.5;
		t.y = 557.9;
		return t;
	};
	_proto.totalHeBet_i = function () {
		var t = new eui.Label();
		this.totalHeBet = t;
		t.anchorOffsetX = 0;
		t.rotation = 90.03;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x9F7C6B;
		t.verticalAlign = "middle";
		t.width = 73;
		t.x = 898.83;
		t.y = 777.51;
		return t;
	};
	_proto.totalHuBet_i = function () {
		var t = new eui.Label();
		this.totalHuBet = t;
		t.anchorOffsetX = 0;
		t.rotation = 90.03;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x9F7C6B;
		t.verticalAlign = "middle";
		t.width = 73;
		t.x = 894.83;
		t.y = 1002.36;
		return t;
	};
	_proto.hisScroller_i = function () {
		var t = new eui.Scroller();
		this.hisScroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 1069.6;
		t.bounces = true;
		t.height = 1076.08;
		t.rotation = 0;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 580.32;
		t.x = 241.28;
		t.y = 1387.77;
		t.viewport = this.hisScrollerG_i();
		return t;
	};
	_proto.hisScrollerG_i = function () {
		var t = new eui.Group();
		this.hisScrollerG = t;
		t.anchorOffsetY = 0;
		t.height = 982.08;
		t.skewY = 180;
		return t;
	};
	_proto.settleGroup_i = function () {
		var t = new eui.Group();
		this.settleGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this._Rect1_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this._Image12_i(),this.longWin_i(),this.huWin_i(),this.he_i(),this._Label1_i(),this._Label2_i(),this._Image13_i(),this._Image14_i(),this._Image15_i(),this.winCoin_i(),this.longCoin_i(),this.huCoin_i(),this.heCoin_i(),this.longPoker_i(),this.huPoker_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillColor = 0x463734;
		t.height = 1054.67;
		t.width = 1;
		t.x = 596.32;
		t.y = 328;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "title_text_tzjs_png";
		t.x = 853.25;
		t.y = 296.61;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "loong_png";
		t.verticalCenter = -302;
		t.x = 638.32;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "vs_png";
		t.verticalCenter = 0;
		t.x = 655.82;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "tiger_png";
		t.x = 638;
		t.y = 1071;
		return t;
	};
	_proto.longWin_i = function () {
		var t = new eui.Image();
		this.longWin = t;
		t.source = "jg_win_png";
		t.x = 724.32;
		t.y = 440.5;
		return t;
	};
	_proto.huWin_i = function () {
		var t = new eui.Image();
		this.huWin = t;
		t.source = "jg_win_png";
		t.x = 724.32;
		t.y = 1168.5;
		return t;
	};
	_proto.he_i = function () {
		var t = new eui.Image();
		this.he = t;
		t.source = "jg_he_png";
		t.verticalCenter = 0;
		t.x = 578.82;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.rotation = 90.1;
		t.size = 34;
		t.text = "我的投注：";
		t.textColor = 0x9f7f74;
		t.width = 189.01;
		t.x = 525.88;
		t.y = 440.57;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.rotation = 90.1;
		t.size = 34;
		t.text = "赢得筹码：";
		t.textColor = 0x9F7F74;
		t.width = 170.02;
		t.x = 270.42;
		t.y = 440.57;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.height = 72;
		t.source = "cp_loong_png";
		t.width = 72;
		t.x = 469.72;
		t.y = 657;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.height = 72;
		t.source = "cp_tiger_png";
		t.width = 72;
		t.x = 378.04;
		t.y = 657;
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.height = 72;
		t.source = "cp_he_png";
		t.width = 72;
		t.x = 290.16;
		t.y = 657;
		return t;
	};
	_proto.winCoin_i = function () {
		var t = new eui.Label();
		this.winCoin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.rotation = 90.1;
		t.size = 34;
		t.text = "+0 FOF";
		t.textColor = 0x30ac62;
		t.width = 170.02;
		t.x = 270.42;
		t.y = 670.57;
		return t;
	};
	_proto.longCoin_i = function () {
		var t = new eui.Label();
		this.longCoin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.7;
		t.rotation = 89.58;
		t.size = 34;
		t.text = "0 FOF";
		t.textColor = 0x8d7257;
		t.width = 150.01;
		t.x = 518.25;
		t.y = 755.54;
		return t;
	};
	_proto.huCoin_i = function () {
		var t = new eui.Label();
		this.huCoin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.7;
		t.rotation = 89.58;
		t.size = 34;
		t.text = "0 FOF";
		t.textColor = 0x8D7257;
		t.width = 150.01;
		t.x = 429.84;
		t.y = 755.53;
		return t;
	};
	_proto.heCoin_i = function () {
		var t = new eui.Label();
		this.heCoin = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32.7;
		t.rotation = 89.58;
		t.size = 34;
		t.text = "0 FOF";
		t.textColor = 0x8D7257;
		t.width = 150.01;
		t.x = 341.96;
		t.y = 755.54;
		return t;
	};
	_proto.longPoker_i = function () {
		var t = new eui.Image();
		this.longPoker = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 97.06;
		t.rotation = 90.05;
		t.source = "poker_back_png";
		t.width = 78.37;
		t.x = 762.82;
		t.y = 670.58;
		return t;
	};
	_proto.huPoker_i = function () {
		var t = new eui.Image();
		this.huPoker = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 97.06;
		t.rotation = 90.05;
		t.source = "poker_back_png";
		t.width = 78.37;
		t.x = 759.78;
		t.y = 955.38;
		return t;
	};
	_proto.tipsGroup_i = function () {
		var t = new eui.Group();
		this.tipsGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scrollEnabled = false;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this._Image16_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.source = "title_text_wfsm_png";
		t.x = 854.75;
		t.y = 297.61;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 581.41;
		t.anchorOffsetY = 1068.43;
		t.bounces = false;
		t.height = 1064.08;
		t.rotation = 180;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 580.32;
		t.x = 228.85;
		t.y = 315.23;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 480.01;
		t.width = 365.01;
		t.x = -165.01;
		t.y = 0;
		t.elementsContent = [this.ruleLabel_i()];
		return t;
	};
	_proto.ruleLabel_i = function () {
		var t = new eui.Label();
		this.ruleLabel = t;
		t.anchorOffsetX = 0;
		t.lineSpacing = 30;
		t.rotation = 270.09;
		t.text = "";
		t.textColor = 0x9f7f74;
		t.width = 1064.01;
		t.x = 13.98;
		t.y = 1064.08;
		return t;
	};
	_proto.recordGroup_i = function () {
		var t = new eui.Group();
		this.recordGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		t.elementsContent = [this._Image17_i(),this._Label3_i(),this._Label4_i(),this.betCoin_i(),this.resCoin_i(),this.recordS_i()];
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.source = "title_text_xzjl_png";
		t.x = 856.08;
		t.y = 299.61;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.fontFamily = "PingFangSC-Regular";
		t.height = 28;
		t.rotation = 90.7;
		t.text = "下注总金额：";
		t.textColor = 0x9f7c6b;
		t.x = 896.03;
		t.y = 540.36;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.fontFamily = "PingFangSC-Regular";
		t.height = 28;
		t.rotation = 90.7;
		t.text = "输赢总金额：";
		t.textColor = 0x9F7C6B;
		t.x = 895.68;
		t.y = 858.34;
		return t;
	};
	_proto.betCoin_i = function () {
		var t = new eui.Label();
		this.betCoin = t;
		t.fontFamily = "PingFangSC-Regular";
		t.height = 28;
		t.rotation = 90.7;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0 FOF";
		t.textColor = 0x9F7C6B;
		t.x = 895.68;
		t.y = 720.68;
		return t;
	};
	_proto.resCoin_i = function () {
		var t = new eui.Label();
		this.resCoin = t;
		t.fontFamily = "PingFangSC-Regular";
		t.height = 28;
		t.rotation = 90.7;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0 FOF";
		t.textColor = 0x9F7C6B;
		t.x = 892.91;
		t.y = 1040.1;
		return t;
	};
	_proto.recordS_i = function () {
		var t = new eui.Scroller();
		this.recordS = t;
		t.anchorOffsetX = 285;
		t.anchorOffsetY = 537.88;
		t.bounces = true;
		t.height = 1075.76;
		t.rotation = 0;
		t.scrollPolicyH = "on";
		t.scrollPolicyV = "off";
		t.width = 570;
		t.x = 532;
		t.y = 857.88;
		t.viewport = this.recordG_i();
		return t;
	};
	_proto.recordG_i = function () {
		var t = new eui.Group();
		this.recordG = t;
		t.anchorOffsetY = 0;
		t.height = 1060.61;
		t.rotation = 0;
		t.skewY = 180;
		t.elementsContent = [this._Label5_i(),this._Label6_i(),this._Label7_i(),this._Label8_i()];
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 120;
		t.bold = true;
		t.rotation = -90;
		t.skewY = 90;
		t.text = "下注对象";
		t.textColor = 0x9f7f74;
		t.x = 30;
		t.y = 180;
		return t;
	};
	_proto._Label6_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 120;
		t.bold = true;
		t.rotation = -90;
		t.skewY = 90;
		t.text = "下注金额";
		t.textColor = 0x9f7f74;
		t.x = 30;
		t.y = 460;
		return t;
	};
	_proto._Label7_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 120;
		t.bold = true;
		t.rotation = -90;
		t.skewY = 90;
		t.text = "输赢金额";
		t.textColor = 0x9F7F74;
		t.x = 30;
		t.y = 740;
		return t;
	};
	_proto._Label8_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 120;
		t.bold = true;
		t.rotation = -90;
		t.skewY = 90;
		t.text = "出牌结果";
		t.textColor = 0x9F7F74;
		t.x = 30;
		t.y = 1000;
		return t;
	};
	_proto.close_i = function () {
		var t = new eui.Image();
		this.close = t;
		t.source = "close_png";
		t.x = 853.18;
		t.y = 1371.25;
		return t;
	};
	return InfoPanal;
})(eui.Skin);generateEUI.paths['resource/eui_skins/modal/Loading.exml'] = window.Loading = (function (_super) {
	__extends(Loading, _super);
	function Loading() {
		_super.call(this);
		this.skinParts = ["loop","rect","label","image","light"];
		
		this.height = 1716;
		this.width = 1080;
		this.loop_i();
		this.elementsContent = [this.rect_i(),this.label_i(),this.image_i(),this.light_i()];
		
		eui.Binding.$bindProperties(this, ["light"],[0],this._TweenItem1,"target");
		eui.Binding.$bindProperties(this, [90],[],this._Object1,"rotation");
		eui.Binding.$bindProperties(this, [450],[],this._Object2,"rotation");
	}
	var _proto = Loading.prototype;

	_proto.loop_i = function () {
		var t = new egret.tween.TweenGroup();
		this.loop = t;
		t.items = [this._TweenItem1_i()];
		return t;
	};
	_proto._TweenItem1_i = function () {
		var t = new egret.tween.TweenItem();
		this._TweenItem1 = t;
		t.paths = [this._Set1_i(),this._To1_i()];
		return t;
	};
	_proto._Set1_i = function () {
		var t = new egret.tween.Set();
		t.props = this._Object1_i();
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		this._Object1 = t;
		return t;
	};
	_proto._To1_i = function () {
		var t = new egret.tween.To();
		t.duration = 1600;
		t.props = this._Object2_i();
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		this._Object2 = t;
		return t;
	};
	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.7;
		t.fillColor = 0x000000;
		t.height = 1716;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		return t;
	};
	_proto.label_i = function () {
		var t = new eui.Label();
		this.label = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 75.45;
		t.horizontalCenter = 0;
		t.rotation = 89.68;
		t.text = "加载中···";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 204.3;
		return t;
	};
	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.horizontalCenter = 0;
		t.rotation = 89.85;
		t.source = "loading_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.light_i = function () {
		var t = new eui.Image();
		this.light = t;
		t.horizontalCenter = 8;
		t.rotation = 89.96;
		t.source = "loading_light_png";
		t.verticalCenter = 0;
		return t;
	};
	return Loading;
})(eui.Skin);