import React from 'react';
import Link from 'next/link';
import { GiNightSleep } from 'react-icons/gi';
import { HiSun } from 'react-icons/hi';
import { MdLunchDining, MdDinnerDining, MdFastfood } from 'react-icons/md';
import { Meals } from '~/config/selectBoxList';

type Props = {
  termLink: string;
  termName: string;
};

const TermLinkButton: React.FC<Props> = ({ termLink, termName }) => {
  // つぶやきの分類によってボタンの背景色とアイコンを変更する
  const switchBgAndIcon = (termName: string) => {
    const termNameType = termName as Meals;

    switch (termNameType) {
      case '朝ごはん':
        return {
          bg: 'bg-yellow-500',
          Icon: () => <HiSun className="inline" />,
        };

      case '昼ごはん':
        return {
          bg: 'bg-red-400',
          Icon: () => <MdLunchDining className="inline" />,
        };

      case '夜ごはん':
        return {
          bg: 'bg-blue-500',
          Icon: () => <MdDinnerDining className="inline" />,
        };

      case '夜食':
        return {
          bg: 'bg-indigo-500',
          Icon: () => <GiNightSleep className="inline" />,
        };

      case '間食':
        return {
          bg: 'bg-green-500',
          Icon: () => <MdFastfood className="inline" />,
        };
    }
  };

  const { bg, Icon } = switchBgAndIcon(termName);

  return (
    <Link href={termLink} passHref>
      <a className={`inline-block px-2 rounded-3xl text-white hover:bg-opacity-80 mr-1 ${bg}`}>
        <Icon />
        <span className="align-text-top pl-2">{termName}</span>
      </a>
    </Link>
  );
};

export default TermLinkButton;
