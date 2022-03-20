import React, { ReactElement } from 'react';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { MdLunchDining, MdDinnerDining, MdFastfood } from 'react-icons/md';
import { Meals } from '~/config/selectBoxList';

// つぶやきの種類によってアイコンを変更する
const TermName = (termName: string): ReactElement => {
  const termNameType = termName as Meals;

  switch (termNameType) {
    case '朝ごはん':
      return (
        <>
          <HiSun />
          <span className="pl-2 pr-1">{termName}</span>
        </>
      );

    case '昼ごはん':
      return (
        <>
          <MdLunchDining />
          <span className="pl-2 pr-1">{termName}</span>
        </>
      );

    case '夜ごはん':
      return (
        <>
          <MdDinnerDining />
          <span className="pl-2 pr-1">{termName}</span>
        </>
      );

    case '夜食':
      return (
        <>
          <GiNightSleep />
          <span className="px-2">{termName}</span>
        </>
      );

    case '間食':
      return (
        <>
          <MdFastfood />
          <span className="pl-2 pr-1">{termName}</span>
        </>
      );
  }
};

export default TermName;
