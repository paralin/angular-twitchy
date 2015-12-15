'use strict';
(function(angular){

  /* global sanitizeText: false */

  /**
   * @ngdoc filter
   * @name twitchy
   * @kind function
   *
   * @description
   * Finds twitch emotes in text input and turns them into css icons.
   *
   * Extendable with paralin/twitch-chat-emoticon-sprites, generate the sprites you want and specify the extra emotes to detect.
   *
   * @param {string} text Input text.
   * @returns {string} Html-linkified text.
   *
   * @usage <span ng-bind-html="twitch_expression | twitchy"></span>
   */
  var module = angular.module('twitchy', ['ngSanitize']);
  var prov = {
    emotes: ["ANELE","AngelThump","ArgieB8","ArsonNoSexy","AsianGlow","AtGL","AtIvy","AtWW","AthenaPMS","BCWarrior","BORT","BabyRage","BaconEffect","BadAss","BasedGod","BatChest","BatKappa","BibleThump","BigBrother","BionicBunion","Blackappa","BlargNaut","BloodTrail","BrainSlug","BroBalt","BrokeBack","BuddhaBar","ButterSauce","CHAccepted","CandianRage","CiGrip","ConcernDoge","CoolCat","CorgiDerp","CougarHunt","CruW","DAESuppy","DBstyle","DOOMGuy","DansGame","DatHass","DatSauce","DatSheffy","DendiFace","DogFace","DogeWitIt","EagleEye","EleGiggle","EvilFetus","FPSMarksman","FUNgineer","FailFish","FapFapFap","FeelsBadMan","FeelsBirthdayMan","FeelsGoodMan","FireSpeed","FishMoley","ForeverAlone","FrankerZ","FreakinStinkin","FuckYea","FunRun","FuzzyOtterOO","GabeN","GasJoker","GingerPower","GrammarKing","HHydro","HailHelix","HassanChop","HerbPerve","HeyGuys","Hhhehehe","HotPokket","HumbleLife","ItsBoshyTime","JKanStyle","Jebaited","JonCarnage","KAPOW","KKona","KZskull","KaRappa","Kaged","Kappa","KappaPride","Keepo","KevinTurtle","Kippa","Kreygasm","MVGame","Mau5","MechaSupes","MrDestructoid","NaM","NightBat","NinjaTroll","NoNoSpot","NotATK","NotLikeThis","OMGScoots","OSbeaver","OSbury","OSdeo","OSfrog","OSkomodo","OSrob","OSsloth","OhGod","OhMyGoodness","OhhhKee","OneHand","OpieOP","OptimizePrime","PJHarley","PJSalt","PMSTwin","PRChase","PancakeMix","PanicVis","PazPazowitz","PedoBear","PeoplesChamp","PermaSmug","PicoMause","PipeHype","PogChamp","PokerFace","PoleDoge","Poooound","PraiseIt","PunchTrees","PuppeyFace","RaccAttack","RageFace","RalpherZ","RarePepe","RebeccaBlack","RedCoat","ResidentSleeper","RitzMitz","RuleFive","SMOrc","SMSkull","SSSsss","SavageJerky","SexPanda","ShadyLulu","ShazBotstix","Shazam","ShibeZ","ShoopDaWhoop","SoBayed","SoSerious","SoonerLater","SqShy","SriHead","SteamSale","StoneLightning","StrawBeary","SuchFraud","SuperVinlin","SwedSwag","SwiftRage","TF2John","TTours","TaxiBro","TheKing","TheRinger","TheTarFu","TheThing","ThunBeast","TinyFace","TooSpicy","TopHam","TriHard","TwaT","UleetBackup","UnSane","UncleNox","VaultBoy","VisLaud","Volcania","WTRuck","WatChuSay","WhatAYolk","WholeWheat","WinWaker","WutFace","YetiZ","YouWHY","_4Head","aPliS","admiralDong","admiralDream","admiralFool","admiralGame","admiralGasm","admiralHappy","admiralHug","admiralKappe","admiralKristin","admiralPleb","admiralS4","admiralSexy","admiralThump","admiralW","ariseHS","ariseSSJ","ariseW","bUrself","bleedPurple","bttvAngry","bttvConfused","bttvCool","bttvGrin","bttvHappy","bttvHeart","bttvNice","bttvSad","bttvSleep","bttvSurprised","bttvTongue","bttvTwink","bttvUnsure","bttvWink","dadAm","dadAwful","dadChamp","dadFlame","dadHi","dadPeppers","dadPuck","dadSkyl","dadSlark","dadWerk","dadXD","dagerDendi","dagerFromDendi","dagerPudge","ddmBulbaPlz","ddmDemonDoto","ddmGASM","ddmGetDunked","ddmKpop","ddmLAMO","ddmOldManFear","deExcite","deIlluminati","duDudu","emgHat","faceyA","faceyAce","faceyDBL","faceyDBR","faceyDance","faceyDdk","faceyFacey","faceyH","faceyHorse","faceyJZFB","faceyJuan","faceyKnife","faceyLord","faceyMaster","faceyN","faceyNade","faceyP","faceyR","faceyRIP","faceyTHREAT","faceyTaz","faceyThoorin","faceyTop","faceyW","faceyWheel","fearDoto","fearFreeToFeed","fearFreeToPlay","fearGASM","forsen30","forsenAbort","forsenBanned","forsenBoys","forsenC","forsenClown","forsenDDK","forsenGasm","forsenKev","forsenMoney","forsenODO","forsenOP","forsenPepe","forsenPlugdj","forsenPuke","forsenRP","forsenSS","forsenSambool","forsenSheffy","forsenSnus","forsenSwag","forsenW","forsenWOW","forsenX","gds2dg","gds2mad","gdsAdbc","gdsApollosc","gdsBeststudio","gdsHlspwn","gdsIsfrog","gdsNuman","gdsSkrffz","gdsSmlr","gdsSupsonl","gdsSupsonr","gdsTranceh","gdsVcat","gdsWalterw","gdsWps","haHAA","iDog","iamsocal","ixmikeLAMO","ixmikeW","lirikAppa","lirikB","lirikBLIND","lirikC","lirikCHAMP","lirikCLENCH","lirikCRASH","lirikD","lirikDJ","lirikF","lirikFAT","lirikFEELS","lirikGOTY","lirikGasm","lirikH","lirikHYPE","lirikHug","lirikL","lirikLEWD","lirikM","lirikMEOW","lirikMLG","lirikNICE","lirikNOT","lirikO","lirikOBESE","lirikP","lirikPOOP","lirikREKT","lirikRIP","lirikTEN","lirikTRASH","lirikThump","lirikW","lirikWc","mcaT","meanderBigPlays","meanderChamp","meanderNevaEva","meanderRage","meanderStrat","meanderSunMeander","miniJulia","motnahP","panicBasket","pjkPedro","pjkRage","pjkSwag","ppdBB","ppdDZ","ppdDead","ppdGLHF","ppdGS","ppdSalt","ppdTilting","ppdUSA","rStrike","riPepperonis","rtzFail","rtzGodDAMN","rtzPotato","rtzSmooth","rtzSun","rtzW","sajDance","sajHype","sajKingB","sajMonkey","sajNoBoots","sajPee","sajRNG","sajSalt","shazamicon","singsingDoge","singsingKawaii","singsingMimimi","singsingPLD","singsingSaiyan","singsingStayinthetrees","singsingWat","sosGame","sumailKappa","sumailRight","sumailSwag","sumailWrong","synd4Giggle","syndAl","syndEleHead","syndErwin","syndFeedereN","syndMagnet","syndRageMilk","syndSilly","tbBaconBiscuit","tbChickenBiscuit","tbQuesarito","tbSausageBiscuit","tbSpicy","tbSriracha","tehPoleCat","trumpBear","trumpChicken","trumpChow","trumpCookie","trumpCrab","trumpDepends","trumpGive","trumpIon","trumpKappa","trumpMusic","trumpOrc","trumpPrison","trumpRope","trumpStats","trumpTSM","trumpThump","trumpUp","trumpValue","trumpW","trumpWhat","twitchRaid","universeEvilYang","universeFV","universeJacket","universeJafaVerse","universeJauismine","universePPDPeter","universeSimbaRTZ","universeSwoleFear","universeZaired","wagaBoom","wagaChamp","wagaCrit","wagaDoubt","wagaFish","wagaGasm","wagaMunch","wagaRage","wagaRawr","wagaRosh","wagaSilence","wagaTa","wagaThump"],
    emotesWidths: [28,84,28,18,24,28,28,28,28,29,19,28,28,28,28,18,28,36,24,30,28,21,41,30,46,28,28,28,28,28,28,26,28,28,21,28,28,21,28,25,28,28,24,28,22,28,18,28,29,20,24,22,28,30,19,30,53,56,28,40,19,28,27,26,28,28,21,28,28,28,19,28,28,28,28,28,18,21,21,20,28,25,28,28,28,25,28,27,21,24,19,24,28,28,39,38,28,19,23,28,28,22,28,28,28,28,28,28,28,28,28,28,20,21,22,28,36,23,28,28,28,18,28,28,28,22,28,23,28,28,21,28,24,28,28,28,33,28,28,19,28,28,20,32,24,24,28,36,28,24,28,28,28,24,28,23,28,28,28,20,20,28,23,28,21,22,28,87,28,20,25,28,26,19,23,28,24,28,17,28,28,28,28,27,28,28,28,20,30,28,60,28,20,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,42,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,56,60,23,60,60,60,25,48,31,36,45,45,28,30,60,22,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,60,28,60,28,28,22,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,21,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],
    addEmotes: function(emots){
      emots.forEach(function(emo){
        if(prov.emotes.indexOf(emo)==-1) prov.emotes.push(emo);
      });
    }
  };

  module.factory("twitchyConfig", function() {
    return prov;
  });

  module.filter('twitchy', ['$sanitize', function($sanitize) {
    return function(text, target) {
      if (!text) return text;
      text = $sanitize(text);

      prov.emotes.forEach(function(emot){
        var reg = new RegExp(emot, 'g');
        text = text.replace(reg, "<i class=\"twitch "+emot+"\"/>");
      });

      return text;
    };
  }]);
})(angular);
