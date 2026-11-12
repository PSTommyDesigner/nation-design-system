# Smart ONE CMS (Meet 1)

Requirements from the first round of meetings with 8 BU

Source: the Google Sheet "Smart ONE CMS: สรุปฟีเจอร์และจุดที่ใช้ AI จาก Requirement 8 BU"
(`https://docs.google.com/spreadsheets/d/19cWHfuVIXkUA5N7gNGv-obvtvsgAn5FSaPQHMqzmx9s`), shared by the user on 2026-11-12.
It sums up meetings with users of 8 BU about problems in the current CMS and what they need.
The sheet is the source of truth. This file is a summary read on 2026-11-12, so check the sheet when a detail matters.

Use this file as background when you build or change a One CMS prototype page. It is not a list of approved work:
each item still goes through ask-first, and the rules in `AGENTS.md` win when they differ.

## The 8 BU in the sheet
Nation Online, The People (`tpp`), Posttoday (`ptd`), Thansettakij (`tsk`), The Nation (`tnt`), Springnews (`spn`), Komchadluek (`kcl`), Bangkokbiznews (`bkk`).
The counts below ("n BU") are how many of the 8 asked for or hit the item.
- NEEDS CLARIFICATION: Nation Online has no code in `docs/brand-codes.md`. Which brand code is it?

## Main problems in the current CMS (tab ปัญหาระบบเดิม)
1. Every BU has trouble writing in the Editor, so many teams write in Word or Notepad first and paste it in
2. Every BU distrusts the current AI: slow, errors and wrong warnings
3. Tags and search fail in 6 BU: searches miss, and duplicate tags are everywhere
4. Mobile is hard to use in 5 BU, and 2 BU don't use mobile at all
5. Dashboard numbers can't be trusted in 4 BU

Problem groups, with the BU count where it matters
- Editor: the 3 content boxes slow work and cap word counts (5 BU); content lost while writing and double posts on publish (4); pasting from Word or Google Docs breaks styles (5); no charts or tables; key point leaves long blank space; titles cut at 50 characters on the site; backlinks are copied by hand; client articles are hard
- Mobile: hard to select text, small buttons, Android copy fails, needs zoom (5)
- Current AI: spell check is slow (2), errors on long or even short news (4), warns too much; summary needs 4 to 5 clicks; SEO titles take time
- Tags and search: duplicate and wrong tags (3); tag search shows about 10 items; search finds only headlines or excerpts, not body text, old news, Korean names or links (4); duplicate news
- Images, video, social: one image at a time, vertical crops cut people, Dailymotion takes many steps, social image cache sticks for 1 hour, next video is unrelated, watermark only in galleries
- Dashboard: numbers lag behind GA (2); Dashboard and list page pageviews differ; export has no pageviews; closed news still shows; pageviews dropping
- Permissions and authors: people who left can still sign in; admin tools need keys typed by hand; byline problems (3); unused menus
- Time: shown time doesn't say it is Thai time (needs +07:00); news doesn't update from 00:00 to 00:10
- Workarounds now: write in Word or Notepad (4 BU), clear styles by hand (2), assign work and send urgent news in LINE (2), outside AI for key points, post to each social platform with Meta tools, SEO team fixes SEO afterwards

## Features by module (tab ฟีเจอร์ตามโมดูล)
- Editor: one content box that the site splits into 3 parts with ad slots (3 BU); clean paste from Word or Google Docs keeping bold and italic (5); upload a Doc file and fill the fields; autosave that never loses data (2); toolbar with only the buttons used; character count that highlights what is over (2); charts and tables; subscript and superscript; backlink picker that searches our news from the selected word (2); excerpt with bold and light styles, separate from the plain SEO description
- Mobile and iPad: write and edit for real, with big buttons, easy selection and no zoom (6 BU)
- Media: drag many images with captions and alt (3); one upload, many sizes and a standard 700 x 467 (3); an engagement cover image that posts to social (1); vertical crop that keeps people in frame (2); watermark choice and original download (3); search DAM or Nation Photo; cover and vertical clip templates; auto data for gold, oil, stocks, weather and lottery (2); paste a social link to embed (3); easy video from NTV Logging (2); upload short video directly
- Workflow: news status set per BU, such as draft, waiting for review, reviewed, hidden, published (2); editor notes sent back; a task board instead of LINE; check that the meeting's topics were covered; edit history; client article writing
- Tag and SEO: add a new tag in the writing page; AI drafts Title and Description (4); AI suggests tags from existing ones first and a new tag only when confirmed (5); related news suggested, with cover image, sorted by relevance or newest (5); SEO check while writing (3); show up in AI search; bylines that can be added, pinned and sorted by use
- Social: post to FB, IG and X from the back office with a separate schedule per platform (2); lock news chosen by AI every 1 or 3 days (2)
- Dashboard
  - Pageviews per reporter: click a name to see each news item, by week or month (4 BU)
  - Split by category and video: top video news, click the chart to see which topic the views came from, social views (2)
  - Daily news count by topic, category and reporter: by day or month, the editor sees how many news each topic got, compare on one page, click a bar to see which reporters wrote, keep a daily stack of views (5)
  - Realtime numbers with no GA delay (2); remove bots (1); top 10 pageviews for the site and ranking (1); reporter KPI linked to HR (1)
- Security: close accounts of people who left; 2FA outside the office; show who is signed in
- UI: dark mode (1)
- Website: tap an image to zoom; page layout from section templates with category positions set without keys (2); a BU mascot; member data and news picked for member interests

## AI along the news path (tab AI ตามเส้นทางข่าว)
- Plan: check that the meeting's topics were covered; group news into topics, count news per topic and draft a timeline from earlier news in the topic (5 BU, a topic is a story, a tag is a keyword); find chances in Search Console
- Write: key points inside the system; summary in one click; write news from data the editor approves; translate Thai and English with a shared name dictionary and British English for The Nation; split a Doc file into fields
- Check: Thai spell check that warns only on real mistakes (4); British English terms; SEO and AEO check with the writer choosing what to fix (3)
- Prepare: Title and Description (4); SEO-friendly excerpt (2); tags from the existing list first (5); related news (5); alt text drafts for images (2); focus point before vertical crops (2); words that should get a backlink (2); Google Discover readiness
- Publish: captions per platform in each BU's own voice (2); lock news; next video that matches the news; news for member interests; topic hub pages; headline A/B tests on the home page
- Measure: catch bot traffic with anomaly detection, no LLM needed
- Old news: move old news into new categories; merge duplicate tags (2); refresh old news people still search for

AI rules (from the same tab)
1. AI suggests, a person decides, always
2. AI and writing style can be turned on or off per BU
3. One click must give a result. Keep a test set of news to check quality before every release
4. Use system rules, not AI, for style clearing, quotation marks, H3 size, link color, image size and ad positions

The three goals: cut repeated work (tags, titles, alt text, captions), raise productivity (key points, summaries, translation and SEO in one system), and keep the highest trust as a news outlet (spell check, numbers from APIs not made up by AI, a person decides).

## Features proposed by the dev team (tab ฟีเจอร์ที่เสนอ)
Mostly 0 BU asked for these yet
- Plan: turn meeting notes into board tasks; a numbers summary before the news meeting; topics trending that we haven't covered
- Write: warn when similar news exists (1 BU); LINE bot that turns field messages and photos into CMS drafts; voice typing; a block editor with "/" commands and ready blocks such as fact box, timeline and Q and A; ready text and writing rules per BU
- Check: check client articles for banned and exaggerated words (1); legal, image and headline risk check before publishing; image copyright; a publish checklist set per BU that blocks publishing until complete
- Prepare: search by meaning, including body text and old news, tolerant of typos (6 BU); ask the news archive like a chat; one click drafts every field; pick a video cover frame; improve field photos; manage galleries; tag synonyms and a warning when a similar tag exists
- Publish: suggest news for each home page section (2); author profile pages; a social post calendar with duplicate warnings; suggested post times
- Measure
  - Dashboard sums up views in a sentence: which news made views go up or down, so the editor reads it fast
  - Alert on news whose views are surging: tell the editor when a news item rises unusually fast against others in the same period, with where readers come from, such as Google or Facebook, so the editor can follow up, move it to the home page or post more on social
- Old news: check internal links and broken links

## Things to improve (tab สิ่งที่ต้องปรับให้ดีขึ้น)
Group A, fix in the current system now: close accounts of people who left; spell check for long news by splitting paragraphs and underlining in the text instead of a pop-up; key point blank space; double posts on publish; tag search limit; +07:00 time; the 00:00 to 00:10 gap; remove unused menus; export with pageviews; summary and spell check errors; preview without iframes; client ads not showing; closed news on the dashboard; See Temp link expiry; Check rank; duplicate news; Korean name search; special characters on paste; clean up tags; move old news to new categories; missing bylines; standard image size; key point summary at the top; link color; social image cache; next video logic

Group B, do better in the new system, with proposed targets for acceptance
1. Spell check (8 BU): only real mistakes, a dictionary per BU, a British English mode. Target: 10,000 characters with no error, first result in 5 seconds, fewer than 1 in 10 false warnings
2. AI summary and key points (2): show status at once, stream results, give a reason and a retry button on failure. Target: one click works every time, results start within 3 seconds
3. Mobile posting (8): a "quick send" page for mobile with camera photo, headline and one content box, sent to the editor or published; buttons at least 44 px with the toolbar above the keyboard; compress images; save drafts on the device; voice to text; test on iPhone, iPad and Android. Target: a short news item with a photo sent from mobile in 3 minutes without zooming
4. Writing and saving (7): nothing lost when the network drops or the tab closes; paste from Word or Google Docs in one go
5. Search and tags (6): search body text and old news, tolerate typos, search by link, no duplicate tags
6. Dashboard (4): every page uses the same numbers, bots removed, updated no later than 15 minutes
7. Authors and details (3): pen names sorted by use; one word for pen name and byline; title warns and locks at 50 characters; many images at once
8. Permissions per menu (1)
9. Bring related menus into the writing page, such as gallery editing
10. Search by reporter name on the list page
11. Merge the Video and Video gallery menus (1)

## What this means for the Dashboard prototype
- On hold (set by the user 2026-11-12): the team has not agreed on which features to build, so prototype UI MUST NOT change from this file until the user says so
- The user first picked three Dashboard additions (an alert on surging news, an AI sentence summary of views, clicking a chart bar to see reporters and topics), then cancelled them the same day and the surge alert was reverted
- Already in the prototype before this file: the reporter news `Modal` (pageviews per reporter, click a name), the ranking by category, the chart of news created and views
