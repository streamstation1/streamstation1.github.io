/* Location and headcode reference data transcribed from the supplied Google Sheet:
   Mercia Rail Haulage Operations Spreadsheets > Headcode Planning (gid 1789049803).
   Duplicate CRS-style 3-letter codes are intentionally preserved; TIPLOCs are unique. */
const GCR_SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1uI9NQ5uf1RKdUgtc1b2VqdiF7WaqM2ZUrjm-coMUNaA/edit?gid=1789049803';
const GCR_STATION_ROWS = `
Ashbury|ASH|ASHBURY
Backston Docks|BTD|BKSNDKS
Backwell Halt|BWH|BACKWEL
Barsea|BSA|BARSEA
Bessbridge|BBG|BESBRDG
Bexley Junction|BXJ|BEXLYJN
Brimsley|BSY|BRMSLEY
Burnley Arms|BLA|BNLYARM
Burghley St George|BSG|BRHLYSG
Capchester High Str|CHS|CAPHIST
Capchester Queen Str|CQS|CAPQUST
Chelston Road|CTR|CHLSNRD
Chestergate|CTG|CHSTRGT
Chudleigh St Juliots|CSJ|CHDLSHJ
Claremont Jn|CMJ|CLRMTJN
Crelacombe|CRB|CRLCMBE
Crickhowell|CHW|CRKHWEL
Dormans|DMS|DORMANS
Dovey Junction|DVY|DOVEYJN
Durrington Park|DTP|DRNGTPK
Elustour Central|ELC|ELUSCTL
Elustour Oxford Rd|EOR|ELUSOFX
Elustour Pridormial|ELP|ELUSPRM
Fatherwell|FTW|FTHRWEL
Fatherwell Sth|FTS|FTWELLS
Folkingham Central|FCL|FOLKCTL
Folkingham General|FGL|FOLKGNL
Gallagher Road|GLR|GLGRRD
Gorseford|GFD|GORSFRD
Gothlan|GLN|GOTHLAN
Grentorleigh|GTL|GNTRLGH
Gyles Mount|GYL|GYLES
Happard|HPD|HAPPARD
Hawth|HWT|HAWTH
Hellions Combe|HLC|HLNSCMB
Hessley|HLY|HESSLEY
Hestercombe Halt|HCH|HSTRCMB
Kingash Road|KAR|KNGSHRD
Landfield|LFD|LANFILD
Landfield North|LFN|LANNRTH
Leathminster|LTM|LEATHMI
Marstem Firth|MTF|MSTFRTH
Minestow|MTW|MINSTOW
Milbury Jn|MBJ|MILBJUN
Milbury Square|MBS|MILBSQU
Moorsfoot High Level|MHL|MRSFTHL
Moorsfoot Low Level|MLL|MRSFTLL
New Beckhurst|NBH|NEWBECK
Newbridge|NBG|NWBRGDE
Newingdon Harbour|NHW|NEWHBR
Newingdon Marine|NWM|NEWMRN
Newingdon Town|NWT|NEWTWN
Norbury Common|NBC|NRBRYCM
Norbury Junction|NBJ|NRBRYJN
Oakchurch|OKC|OKCHRCH
Oakwell|OKW|OAKWELL
Pencarno Halt|PCH|PENCARO
Pennal Halt|PNH|PENLHLT
Renford Airport|RFA|RENFAIR
Renford Central|RFC|RENFCTL
Ryefield|RFD|RYFIELD
Saltmarsh|STM|SALTMSH
Seaforth|SEA|SEAFRTH
Sellecroft|SLC|SELCRFT
Slatewell|STW|SLATWEL
St Ashcott|SAC|STASHCT
St Blazey|SBZ|STBLZEY
St Durleigh Crossing|SDC|STDURLC
St Gormshead|SGH|STGORMS
St Parsleys End|SPE|STPRLY
St Penrhyn|SPN|STPRHYN
Stoneycombe|STC|SNYCMBE
Sycamore Halt|SCH|SYCAMRE
Tridentwood Cross|TWC|TRIDENT
Westlake|WLK|WESTLKE
Wicksbridge|WBD|WKBRDGE`;
const GCR_YARD_ROWS = `
Backston Dockyard|BDY|BKSNDKY
Backston Kronospan|BKS|BKSNKRN
Backston Timber RCP|BTR|BKSTMBR
Bessbridge TMD|BTM|BBGTMD
Bessbridge CS|BCS|BBGTCS
Crelacombe Kronospan|CKS|CRLKRON
Fatherwell South Yard|FSY|FTWLYRD
Hestercombe Workshop Yd|HWY|HCWSYRD
Landfield TCD|LTC|LNDFTCD
Landfield CS|LCS|LNDFTCS
Leathminster RTC Railtrack|LRR|LTHRTCQ
Leathminster RTC Lorax|LRL|LTHRTCL
Leathminster West Yard|LWY|LEATHWY
Minestow Freight Yard|MFY|MSTWYFW
Minestow MOD|MMD|MINEMOD
Minestow RRL Sidings|MRS|MINRLSG
Norbury Workshop|NBS|NRBRYSW
Renford Freight Yard|RFY|RENFDFY
Saltmarsh TMD|STM|SALTTMD
Saltmarsh CS|SCS|SALTMCS
Saltmarsh SRS|SMS|SALTSRS
Slatewell TMD|STM|SLATTMD
Slatewell CS|SCS|SLATWCS
Whitleigh MMPD|WMM|MVRMMPD`;
const parseRows = (str,type) => str.trim().split('\n').map(line => {const [name,code,tiploc]=line.split('|'); return {id:tiploc,name,code,tiploc,type};});
const GCR_LOCATIONS = [...parseRows(GCR_STATION_ROWS,'Station / junction'),...parseRows(GCR_YARD_ROWS,'Depot / siding / yard')];
const GCR_HEADCODE_CLASSES = [
['0','Light locomotive'],['1','Express passenger / postal / parcels'],['2','Slow passenger'],
['3','Priority ECS / RHTT / Network Rail test trains'],['4','Fast freight (75 mph)'],
['5','Empty coaching stock (ECS)'],['6','Freight slower than class 4 (60 mph)'],
['7','Freight slower than class 6 (45 mph)'],['8','Freight slower than class 7 (35 mph)'],
['9','High-speed passenger / restricted / out-of-gauge / Channel Tunnel']];
const GCR_HEADCODE_LETTERS = [
['B','Bessbridge'],['C','Chudleigh St Juliots'],['D','Durrington Park'],
['E','ECS to depot'],['F','Fatherwell'],['G','Gothlan'],['J','Bexley Junction'],
['L','Landfield North'],['M','Gyles Mount'],['N','Newingdon Marine / Seaforth'],
['R','Renford Airport / Central'],['S','Express'],['U','Power station workings'],
['V','To / from GCR region'],['X','Exceptional load'],['Y','Engineering trains'],
['Z','Short-term workings / heritage and charter workings']];
