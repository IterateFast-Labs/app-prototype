import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <p className="font-thin">
        100 THIN : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-extralight">
        200 EXTRALIGHT : Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </p>
      <p className="font-light">
        300 LIGHT : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-normal">
        400 NORMAL : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-medium">
        500 MEDIUM : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-semibold">
        600 SEMIBOLD : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-bold">
        700 BOLD : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-extrabold">
        800 EXTRABOLD : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <p className="font-black">
        900 Black : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="space-x-4">
        <Button>Button</Button>
        <Button size={'lg'}>Button</Button>
        <Button size={'sm'}>Button</Button>
      </div>
    </div>
  );
}
