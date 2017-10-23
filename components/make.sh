# cat ../thesis/*.md > temp.md
# cat ../thesis/4.md > temp.md
cat ../thesis/5.markdown > temp.md
cat temp.md | sed -r "s/ ([iIwWzZoOaAuU]) / \1\\\\ /g" > document.md

pandoc document.md\
	--csl=citation-style.xml \
	--latex-engine=xelatex \
	-B title-page/title.latex \
	--toc \
	--toc-depth=3 \
	-H wngig.sty \
	-V geometry:"inner=3.35cm, outer=2.35cm, top=1.5cm, bottom=45bp" \
	--standalone \
	--highlight-style tango \
	--smart \
	-V documentclass=report \
	-f markdown+footnotes+backtick_code_blocks+inline_notes+raw_html \
	-V classoption:"twoside,openright" \
	-V papersize=a4paper \
	-V fontsize=12pt \
	--variable subparagraph \
	--metadata lang=pl-PL \
	--number-sections \
	-o document.pdf && \
xdg-open document.pdf

rm temp.md
rm document.md
