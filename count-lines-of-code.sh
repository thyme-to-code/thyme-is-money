#!/bin/bash

ds() {
  if [ "${OSTYPE:0:6}" = "darwin" ]; then
    date -v-${1}d +%Y-%m-%d
  else
   date --date="$1 days ago" +%Y-%m-%d
  fi
}

echo "GIT changes stat: Date, Total lines modified (new, changed)"
for week in {13..1}
do
  # git log outputs lines like:
  # 11        10      path/to/your/file.java
  #  => add first two columns with awk
  lines_all=$(git --no-pager log --after=$(ds $week) --before=$(ds $(($week - 1))) --format=format: --numstat | awk '{s+=$1; s+=$2} END {print s/1}')
  lines_chg=$(git --no-pager log --after=$(ds $week) --before=$(ds $(($week - 1))) --format=format: --numstat | awk '{s+=$1;} END {print s/1}')
  lines_new=$(git --no-pager log --after=$(ds $week) --before=$(ds $(($week - 1))) --format=format: --numstat | awk '{s+=$2}  END {print s/1}')
  # echo -e "$(ds $week): $lines_all \t\t(new: $lines_new, \tchanged: $lines_chg)"
  printf "%10s: %10s \t\t(new: %10s, \tchanged: %10s)\n" $(ds $week) $lines_all $lines_new $lines_chg
done
