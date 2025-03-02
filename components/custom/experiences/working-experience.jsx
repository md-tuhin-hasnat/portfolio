import {workingExperiences} from '@/data/working-experiences';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BorderBeam } from '@/components/magicui/border-beam';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
export function WorkingExperience() {
  return (
    <section className="grid grid-cols-2 gap-10 mt-8 mb-8">
      {
        workingExperiences.map((experience, index) => {
          return (
            <Card key={index} className="relative">
       
              <CardHeader>
                <section className='flex gap-1 justify-between mb-3'>
                  <h3 className="text-sm font-bold">{experience.company}</h3>
                  <h5 className="text-sm font-light">{experience.duration}</h5>
                </section>

                <section className="flex justify-center">
                  <Image
                    src={experience.image}
                    alt={experience.role}
                    width={200}
                    height={200}
                    className="rounded w-full"
                  />
                </section>
              </CardHeader>
              <CardContent>

                <h4 className="text-lg font-bold">{experience.role}</h4>
                <ul className='list-none flex flex-col gap-1 mt-2'>
                {
                  experience.description.map((desc, index) => {
                    return (
                      <li key={index} className="text-sm font-light flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3 inline-block mr-2" />
                        {desc}
                      </li>
                    )
                  })
                }
                </ul>
              </CardContent>
              <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-yellow-500 to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-primary to-transparent"
              />
            </Card>
          )
        })
      }
    </section>
  );
}