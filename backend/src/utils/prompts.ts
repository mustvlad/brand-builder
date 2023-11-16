export const systemTemplate = `- pastreaza o atitudine si un tone of voice profesionist
- nu folosi cuvinte prea pompoase 
- nu scrie beletristica 
- less verbose
- raspunde doar in limba romana`;

export const getDistinctiveElementsTemplate = `Q: Clasifica informatiile primite ca input si extrage o lista de elemente diferentiatoare ale unui medic nutritionist dietetician raportate la media de piata din Romania.

Reguli: Atunci cand selectezi un element diferentiator, pastreaza date specifice precum nume, titluri de lucrari, nume de conturi social media sau platforme sau date exacte. Raspunde doar cu o lista de elemente diferentiatoare.

Input:
- Nume si prenume: {fullName}
- Studii universitare/ postuniversitar: {studies}
- Specializare: {specialization}
- Expertiză profesională: {expertise}
- Supraspecializare / Arii principale de interes: {overspecialization}
- Acreditări / certificări: {certifications}
- Abilități didactice: {teachingSkills}
- Abilități tehnologice: {tehnologicalSkills}
- Abilități de cercetător: {researchSkills}
- Abilități de public speaking: {publicSpeakingSkills}
- Abilități de mentor/ traineri/ coach: {mentorSkills}
- Lider în industrie: {leadershipSkills}
- Implicare în societate: {communityInvolvement}
- Trasături de caracter: {characterTraits}
- Stil de interacțiune cu pacienții: {patientInteractionStyle}
- Ce valoare vrei să aduci în viețile oamenilor: {addedValue}
- Insight-uri: {personalInsights}
- De ce ai ales aceasta meserie: {personalReasons} 

A:`;

export const getBrandStatementTemplate = `Q: Plecand de la insight-ul de mai jos, scrie un brand statement despre medicul {fullName}.

Reguli: Un brand statement personal este o propoziție sau două care rezumă brandul tău. Explică ce faci (valoarea), pentru cine îți desfășori activitatea (publicul țintă), și cum o faci (unique selling proposition).

Insight: {how}

A:`;

export const getHowTemplate = `Q: Extrage din urmatoarele elementele diferentiatoare ale {fullName} un paradox / intriga despre acest medic pe care-l putem folosi ca beneficiu pentru pacient dar si pentru a-l pune intr-o lumina buna.  

Reguli: Paradoxul trebuie sa sublinieze metoda sau modul diferentiator al medicului nutritionist-dietetician de a rezolva problemele pacientilor.

Elemente diferentiatoare: {distinctiveElements}

A:`;

export const getWhatTemplate = `Q: Pornind de la input, extrage o lista de servicii pe care pacientii le pot obtine de la medicul {fullName}.

Reguli: Returneaza doar o lista, fara sa mai scrii o introducere sau orice altceva.

Input:
- Nume si prenume: {fullName}
- Studii universitare/ postuniversitar: {studies}
- Specializare: {specialization}
- Expertiză profesională: {expertise}
- Supraspecializare / Arii principale de interes: {overspecialization}
- Acreditări / certificări: {certifications}
- Abilități didactice: {teachingSkills}
- Abilități tehnologice: {tehnologicalSkills}
- Abilități de cercetător: {researchSkills}
- Abilități de public speaking: {publicSpeakingSkills}
- Abilități de mentor/ traineri/ coach: {mentorSkills}
- Lider în industrie: {leadershipSkills}
- Implicare în societate: {communityInvolvement}
- Trasături de caracter: {characterTraits}
- Stil de interacțiune cu pacienții: {patientInteractionStyle}
- Ce valoare vrei să aduci în viețile oamenilor: {addedValue}
- Insight-uri: {personalInsights}
- De ce ai ales aceasta meserie: {personalReasons} 

A:`;

export const getWhyTemplate = `Pe principiul cartii "Start with WHY" pacientii se conecteaza la brand-ul unui medic nu pentru ceea ce face el ci pentru motivul care sta la baza misiunii lui personale.

Q: Pornind de la input, extrage intr-o fraza simpla care este WHY-ul care sta in spatele misiunii mediculu {fullName}? Incepe direct cu "Misiunea medicului este ..."

Input:
- Nume si prenume: {fullName}
- Studii universitare/ postuniversitar: {studies}
- Specializare: {specialization}
- Expertiză profesională: {expertise}
- Supraspecializare / Arii principale de interes: {overspecialization}
- Acreditări / certificări: {certifications}
- Abilități didactice: {teachingSkills}
- Abilități tehnologice: {tehnologicalSkills}
- Abilități de cercetător: {researchSkills}
- Abilități de public speaking: {publicSpeakingSkills}
- Abilități de mentor/ traineri/ coach: {mentorSkills}
- Lider în industrie: {leadershipSkills}
- Implicare în societate: {communityInvolvement}
- Trasături de caracter: {characterTraits}
- Stil de interacțiune cu pacienții: {patientInteractionStyle}
- Ce valoare vrei să aduci în viețile oamenilor: {addedValue}
- Insight-uri: {personalInsights}
- De ce ai ales aceasta meserie: {personalReasons}

A:`;

export const generateAutobiographyTemplate = `Q: Pornind de la urmatoarele informatii despre medicul nutritionist dietetician {fullName}, scrie o autobiografie profesionista adresata pacientilor si colegilor sai. Evita sa folosesti o formula initiala de adresare. Brandul sau identitatea sau povestea ta profesionala si persoanala trebuie sa reiasa din text fara a mentiona explicit acesti termeni sau unii similari.

WHY-ul: "{why}"
HOW-ul: "{how}"
WHAT-ul: "{what}"
Brand statement: "{brandStatement}"
Elemente diferentiatoare: "{distinctiveElements}"

A:`;

export const generateContentPillarsTemplate = `Q: Pornind de la urmatoarele informatii despre medicul nutritionist dietetician {fullName}, genereaza 3 piloni de continut pentru social media pe baza carora sa-si construiasca strategia editoriala din online.

WHY-ul: "{why}"
HOW-ul: "{how}"
WHAT-ul: "{what}"
Brand statement: "{brandStatement}"
Elemente diferentiatoare: "{distinctiveElements}"

A:`;
