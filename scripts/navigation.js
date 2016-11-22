/* BEGIN NAVIGATION FUNCTIONS */

function goToPackSettings(packID){
    window.location.assign("../pages/" + packID + ".html");
}

function toggle(source) {
    checkboxes = document.getElementsByName('verse');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
	checkboxes[i].checked = source.checked;
    }
}

function getPack() {
    // get pack code
    var urlArray = window.location.pathname.split( '/' );
    var packCode = urlArray[7].substring(0,1);
    return packCode;
}

function getPackIndexBoost(packCode) {
    var packIndexBoost;
    switch (packCode) {
    case "a":
	packIndexBoost = 0;
	break;
    case "b":
	packIndexBoost = 12;
	break;
    case "c":
	packIndexBoost = 24;
	break;
    case "d":
	packIndexBoost = 36;
	break;
    case "e":
	packIndexBoost = 48;
	break;
    default:
	alert("oh crap, invalid pack");
    }
    return packIndexBoost;
}

function verifyRefVerseSelection(form) {
    // check for refverse selection
    for (count = 0; count < 2; count++) {
	if (form.reforverse[count].checked) break;
    }
    if (count == 0) {
	reforverse = "ref";
	//alert(reforverse);
    } else if (count == 1) {
	reforverse = "verse";
        //alert(reforverse);
    } else {
	alert("Please select either \"Show Reference/Quiz Verse\" or \"Show Verse/Quiz Reference\"");
	return;
    }
}

function toggleSettingsSection() {
    if (document.getElementById("settingssection").style.display = "inline") {
	document.getElementById("settingssection").style.display = "none";
    } else if (document.getElementById("settingssection").style.display = "none") {
	document.getElementById("settingssection").style.display = "inline";
    }
}

function revealVerseQuizSection() {
    document.getElementById("versequizsection").style.display = "inline";
}

function revealRefQuizSection() {
    document.getElementById("refquizsection").style.display = "inline";
}

function startQuiz(form) {
    verifyRefVerseSelection(form);

    // load checked verses into a string to quiz
    var packCode = getPack();
    var packIndexBoost = getPackIndexBoost(packCode);
    var verse; // a1, a2, etc
    for (i = 1; i < 13; i++) {
	verse = packCode + i;
	if (document.getElementById(verse).checked) {
	    quizList += verse + " ";
	}
    }

    if (quizList == "") {
	alert("Please select one or more verses.");
    }

    // show quiz view
    if (reforverse == "") {
	alert("not found");
    }

    toggleSettingsSection();
    if (reforverse == "ref") {  // show ref, quiz verse
	revealVerseQuizSection();
	document.getElementById("verseentrybox").focus();
    } else if (reforverse == "verse") { // show verse, quiz ref
	revealRefQuizSection();
	document.getElementById("refentry1box").focus();
    } else {
	alert("holy crap what happened");
    }

    quizList = quizList.split(" ");

    doQuiz();
}

/* END NAVIGATION FUNCTIONS */

/* BEGIN QUIZ FUNCTIONS */

function pickAndDisplayVerse() {
    //alert(Math.floor( Math.random() * 11) );
    var length = quizList.length;
    var n = Math.floor(Math.random() * (length - 1) ); //random number in quizList range
    var verseId = quizList[n]; // the chosen Id (a1, a2, a4)
    var packCode = quizList[n].substring(0,1);
    var packIndexBoost = getPackIndexBoost(packCode);
    var index = verseId.substring(1) - 1 + packIndexBoost; //the index for ref/verseArray

    ref = refArray[index];
    verse = verseArray[index];

    if (reforverse == "ref") { // show ref, quiz verse
	document.getElementById("refdisplay1").innerHTML = ref;
	document.getElementById("refdisplay2").innerHTML = ref;
    } else if (reforverse == "verse") { // show verse, quiz ref
	document.getElementById("versedisplay").innerHTML = verse;
    } else {
	alert("Neither ref nor verse selected - this should have been caught earlier");
    }
}

function simplifyString(string) {
    string = string.toLowerCase();
    var c;
    var simplifiedString = "";
    for (var i = 0; i < string.length; i++) {
	c = string.substring(i, i+1);
	//simplifiedString += c + "+";
	if (c == 'a' | c == 'b' | c == 'c' | c == 'd' | c == 'e' |
	    c == 'f' | c == 'g' | c == 'h' | c == 'i' | c == 'j' |
	    c == 'k' | c == 'l' | c == 'm' | c == 'n' | c == 'o' |
	    c == 'p' | c == 'q' | c == 'r' | c == 's' | c == 't' |
	    c == 'u' | c == 'v' | c == 'w' | c == 'x' | c == 'y' | c == 'z' |
	    c == '0' | c == '1' | c == '2' | c == '3' | c == '4' |
	    c == '5' | c == '6' | c == '7' | c == '8' | c == '9') {
	    simplifiedString += c;
	}
    }
    return simplifiedString;
}

function checkVerseAnswer() {
    var answer = document.getElementById("verseentrybox").value;
    if (simplifyString(answer) === simplifyString(verse) ) {
	alert("Correct!");
    } else {
	alert("You put:\n" + answer + "\n\nThe correct answer is:\n" + verse);
    }
    document.getElementById("verseentrybox").value = "";
    doQuiz();
}

function checkRefAnswer() {
    var answer1 = document.getElementById("refentry1box").value;
    var answer2 = document.getElementById("refentry2box").value;
    if ((simplifyString(answer1) === simplifyString(ref)) &&
	(simplifyString(answer2) === simplifyString(ref))) {
	alert("Correct!");
    } else {
	alert("You put: \n" + answer1 + "\n" + answer2 + 
	      "\n\nThe correct answer is:\n" + ref + "\n" + ref);
    }
    document.getElementById("refentry1box").value = "";
    document.getElementById("refentry2box").value = "";
    document.getElementById("refentry1box").focus();
    doQuiz();
}

function doQuiz() {
    pickAndDisplayVerse();
}

/* END QUIZ FUNCTIONS */

/* BEGIN VARIABLE STORAGE */

var quizList = "";  // starts as a string, but becomes array of selected [a1, a2, a4, etc]
var pack;
var reforverse;
var ref;
var verse;

var refArray = ["2 Corinthians 5:17", "Galatians 2:20", 
		"Romans 12:1", "John 14:21",
		"2 Timothy 3:16", "Joshua 1:8",
		"John 15:7", "Philippians 4:6-7",
		"Matthew 18:20", "Hebrews 10:24-25",
		"Matthew 4:19", "Romans 1:16",
		
		"Romans 3:23", "Isaiah 53:6",
		"Romans 6:23", "Hebrews 9:27",
		"Romans 5:8", "1 Peter 3:18",
		"Ephesians 2:8-9", "Titus 3:5",
		"John 1:12", "Revelation 3:20",
		"1 John 5:13", "John 5:24",

		"1 Corinthians 3:16", "1 Corinthians 2:12",
		"Isaiah 41:10", "Philippians 4:13",
		"Lamentations 3:22-23", "Numbers 23:19",
		"Isaiah 26:3", "1 Peter 5:7",
		"Romans 8:32", "Philippians 4:19",
		"Hebrews 2:18", "Psalms 119:9,11",

		"Matthew 6:33", "Luke 9:23",
		"1 John 2:15-16", "Romans 12:2",
		"1 Corinthians 15:58", "Hebrews 12:3",
		"Mark 10:45", "2 Corinthians 4:5",
		"Proverbs 3:9-10", "2 Corinthians 9:6-7",
		"Acts 1:8", "Matthew 28:19-20",

		"John 13:34-35", "1 John 3:18",
		"Philippians 2:3-4", "1 Peter 5:5-6",
		"Ephesians 5:3", "1 Peter 2:11",
		"Leviticus 19:11", "Acts 24:16",
		"Hebrews 11:6", "Romans 4:20-21",
		"Galatians 6:9-10", "Matthew 5:16"];

var verseArray = ["Therefore, if anyone is in Christ, he is a new creation; the old has gone, the new has come!",
		  "I have been crucified with Christ and I no longer live, but Christ lives in me.  The life I live in the body I live by faith in the Son of God, who loved me and gave himself for me.",
		  "Therefore, I urge you brothers, in view of God's mercy, to offer your bodies as living sacrifices, holy and pleasing to God.  This is your spiritual act of worship.",
		  "Whoever has my commands and obeys them, he is the one who loves me.  He who loves me will be loved by my father, and I too will love him and show myself to him.",
		  "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness",
		  "Do not let this Book of the Law depart from your mouth; meditate on it day and night, so that you may be careful to do everything written in it.  Then you will be prosperous and successful.",
		  "If you remain in me and my words remain in you, ask whatever you wish, and it will be given you.",
		  "Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.  And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
		  "For where two or three come together in my name, there am I with them.",
		  "And let us consider how we may spur one another on toward love and good deeds.  Let us not give up meeting together as some are in the habit of doing, but let us encourage one another - and all the more as you see the Day approaching.",
		  "\"Come, follow me,\" Jesus said, \"and I will make you fishers of men.\"",
		  "I am not ashamed of the gospel, because it is the power of God for the salvation of everyone who believes: first for the Jew, then for the Gentile.",
		  
		  "For all have sinned and fall short of the glory of God",
		  "We all, like sheep, have gone astray, each of us has turned to his own way, and the Lord has laid on him the iniquity of us all",
		  "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord",
		  "Just as man is destined to die once, and after that to face judgment",
		  "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us",
		  "For Christ died for sins once for all, the righteous for the unrighteous, to bring you to God.  He was put to death in the body but made alive by the Spirit",
		  "For it is by grace you have been saved, through faith - and this not from yourselves, it is the gift of God - not by works, so that no one can boast",
		  "He saved us, not because of righteous things we had done, but because of his mercy.  He saved us through the washing of rebirth and renewal by the Holy Spirit",
		  "Yet to all who received him, to those who believed in his name, he gave the right to become children of God",
		  "Here I am!  I stand at the door and knock.  If anyone hears my voice and opens the door, I will come in and eat with him, and he with me.",
		  "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.",
		  "\"I tell you the truth, whoever hears my word and believes him who sent me has eternal life and will not be condemned; he has crossed over from death to life.\"",

		  "Don't you know that you yourselves are God's temple, and that God's Spirit lives in you?",
		  "We have not received the spirit of the world, but the Spirit who is from God, that we may understand what God has freely given us.",
		  "So do not fear, for I am with you; do not be dismayed, for I am your God.  I will strengthen you and help you; I will uphold you with my righteous right hand.",
		  "I can do everything through him who gives me strength.",
		  "Because of the Lord's great love, we are not consumed, for his compassions never fail.  They are new every morning, great is your faithfulness.",
		  "God is not a man that he should lie, nor a son of Man that he should change his mind.  Does he speak and then not act?  Does he promise and not fulfill?",
		  "You will keep in perfect peace him whose mind is steadfast, because he trusts in you.",
		  "Cast all your anxiety on him because he cares for you.",
		  "He who did not spare his own Son, but gave him up for us all - how will he not also, along with him, graciously give us all things?",
		  "And my God will meet all your needs according to his glorious riches in Christ Jesus.",
		  "Because he himself suffered when he was tempted, he is able to help those who are being tempted.",
		  "How can a young man keep his way pure?  By living according to your word.  I have hidden your word in my heart that I might not sin against you.",

		  "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
		  "Then he said to them all, \" If anyone would come after me, he must deny himself and take up his cross daily and follow me\"",
		  "Do not love the world or anything in the world.  If anyone loves the world, the love of the father is not in him.  For everything in the world - the cravings of sinful man, the lust of his eyes, and the boasting of what he has and does - comes not from the Father but from the world.",
		  "Do not conform any longer to the pattern of this world, but be transformed by the renewing of your mind.  Then you will be able to test and approve what God's will is - his good, pleasing and perfect will.",
		  "Therefore, my dear brothers, stand firm.  Let nothing move you.  Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.",
		  "Consider him who endured such opposition from sinful men, so that you will not grow weary and lose heart.",
		  "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
		  "For we do not preach ourselves, but Jesus Christ as Lord, and ourselves as your servants for Jesus's sake.",
		  "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing, and your vats will brim over with new wine.",
		  "Remember this: whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.  Each man should give what he has decided in his heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
		  "But you will recieve power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
		  "Therefore, go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.  And surely I am with you always, to the very end of the age.",

		  "A new command I give you: Love one another.  As I have loved you, so you must love one another.  By this all men will know that you are my disciples, if you love one another.",
		  "Dear children, let us not love with words or tongue but with actions and in truth.",
		  "Do nothing out of selfish ambition or vain conceit, but in humility consider others better than yourselves.  Each of you should look not only to your own interests, but also to the interests of others.",
		  "Young men, in the same way be submissive to those who are older.  All of you, clothe yourselves with humility toward one another, because \"God opposes the proud but gives grace to the humble.\"  Humble yourselves, therefore, under God's mighty hand, that he may lift you up in due time.",
		  "But among you there must not be even a hint of sexual immorality, or of any kind of impurity, or of greed, because these are improper for God's holy people.",
		  "Dear friends, I urge you, as aliens and strangers in the world, to abstain from sinful desires, which war against your soul.",
		  "Do not steal.  Do not lie.  Do not deceive one another.",
		  "So I strive always to keep my conscience clear before God and men.",
		  "And without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him.",
		  "Yet he did not waver through unbelief regarding the promise of God, but was strengthened in his faith and gave glory to God, being fully persuaded that God had power to do what he had promised.",
		  "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.  Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers.",
		  "In the same way, let your light shine before men, that they may see your good deeds and praise your Father in heaven."];
